const express = require('express')
const router = express.Router()
const {Posts} = require('../models')
const multer = require('multer')
const path = require('path')

//upload image function
const storage = multer.diskStorage({
     destination:(req,file,cb)=>{
          cb(null,'./Images/Posts')
     },
     filename: (req, file, cb) =>{
          cb(null, Date.now() + path.extname(file.originalname))
     }
})

const upload = multer({
     storage:storage,
     limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')
// get all posts
router.get("/",async(req,res)=>{
     const posts =await Posts.findAll()
     // res.status(200).send(posts)
     res.json(posts)
})

// create new post
router.post("/addPost",upload,async(req,res)=>{
     const post ={
          title: req.body.title,
          desc: req.body.desc,
          author:req.body.author,
          image: req.file.path
     } 
     const posts = await Posts.create(post)
     // res.status(200).send(posts)
     res.json(post)
})

// get a post by id
router.get('/post/:id',async (req,res)=>{
     const id = req.params.id;
     const post = await Posts.findByPk(id)
     res.json(post)
})
module.exports = router