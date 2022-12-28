const express = require("express")
const router = express.Router()
const {Users} = require('../models')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt')
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

router.post('/',upload,async(req,res)=>{
     const {username, password} = req.body
     const photo = req.file.path
     bcrypt.hash(password, 10).then((hash)=>{
          Users.create({
               username: username,
               password: hash,
               photo: photo
          })
          res.json("success")
     })

})

router.post('/login', async(req,res)=>{
     const{username, password} =req.body;
     const user = await Users.findOne({where:{username:username}})
     if(!user) res.json({error:"User doesn't Exit"})
     bcrypt.compare(password,user.password).then((match)=>{
          if(!match) res.json({error:"wrong Username and Password Combination"})
          res.json("You logged in")
     })
})

module.exports = router