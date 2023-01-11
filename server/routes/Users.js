const express = require("express")
const router = express.Router()
const {Users, Posts,sequelize} = require('../models')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const { validateToken } = require("../middlewares/AuthMiddleware")
const { QueryTypes } = require('sequelize')
const fs = require('fs')

//upload photo function
const storage = multer.diskStorage({
     destination:(req,file,cb)=>{
          cb(null,'./Images/Users')
     },
     filename: (req, file, cb) =>{
          cb(null, Date.now() + path.extname(file.originalname))
     }
})

const upload = multer({
     storage:storage,
     limits:{fileSize:'1000000'},
     fileFilter: (req,file,cb) => {
          const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
     
}).single('photo')

//user sign up
router.post('/',async(req,res)=>{
     const {username, password} = req.body
     // const photo = req.file ? req.file.path :''
     bcrypt.hash(password, 10).then((hash)=>{
          Users.create({
               username: username,
               password: hash,
               // photo: photo
          })
          res.json("success")
     })

})

// user sign in
router.post('/signIn', async(req,res)=>{
     const{username, password} =req.body;
     const user = await Users.findOne({where:{username:username}})
     if(!user) {res.json({error:"User doesn't Exit"})}
     bcrypt.compare(password,user.password).then((match)=>{
          if(!match) res.json({error:"wrong Username and Password Combination"})
          const accessToken = sign({username:user.username,id:user.id},"importantsecret")
          res.json({token:accessToken, username:username, id:user.id})
     })
})

//get user from validateToken
router.get('/auth',validateToken,(req,res)=>{
     res.json(req.user)
})

//get user by id
router.get('/:id', validateToken, async(req,res)=>{
     const userId = req.params.id;
     const user = await Users.findOne({where:{id:userId}})
     const PostsByUser = await sequelize.query(`SELECT * FROM Users JOIN Posts ON Users.id = ${userId} AND Users.id = Posts.UserId`,{type:QueryTypes.SELECT})
     res.json({User:user, PostsByUser:PostsByUser})
})
//update photo
router.put('/updatePhoto',validateToken,upload, async(req,res) =>{
     const photo = req.file.path
     const user = await Users.findOne({where:{id:req.user.id}})
     const oldPhoto = user.photo
      Users.update({photo:photo},{where:{id:req.user.id}})
      if(oldPhoto){fs.unlinkSync (oldPhoto)}
     res.json("photo")
     
})

//change password
router.put('/changePassword',validateToken,async(req,res) => {
     const {oldPassword, newPassword } = req.body
     const user = await Users.findOne({where:{id:req.user.id}})
     bcrypt.compare(oldPassword,user.password).then((match)=>{
          if(!match) res.json({error:"Wrong old password entered"})
          bcrypt.hash(newPassword,10).then((hash) => {
               Users.update({password:hash},{where:{id:req.user.id}})
               res.json("success")
          })
     })

})

module.exports = router