const express = require('express')
const router = express.Router()
const {Posts,Likes} = require('../models')
const multer = require('multer')
const path = require('path')
const { validateToken } = require('../middlewares/AuthMiddleware')
const fs = require('fs')
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
     
}).single('image')
// get all posts
router.get("/", validateToken, async(req,res)=>{
     const posts = await Posts.findAll({include:[Likes]})
     const likedPostsByUser = await Likes.findAll({where:{UserId : req.user.id}})
     res.json({posts:posts, likedPostsByUser:likedPostsByUser})
})

// create new post
router.post("/addPost",validateToken, upload,async(req,res)=>{
     const post = {
          title: req.body.title,
          desc: req.body.desc,
          image: req.file.path,
     }
     post.author = req.user.username
     post.UserId = req.user.id
     const posts = await Posts.create(post)
     res.json(posts)
     console.log(post);

})

// get a post by id
router.get('/post/:id',async (req,res)=>{
     const id = req.params.id;
     const post = await Posts.findByPk(id)
     res.json(post)
})

// delete a post by id
router.delete('/post/:id',validateToken, async(req,res) => {
     const id = req.params.id;
     const post = await Posts.findByPk(id)
     fs.unlinkSync (post.image)
     await Posts.destroy({where:{id:id}})
     res.json("Deleted successfully")
})

// edit postTitle
router.put('/title',validateToken, async (req,res) => {
     const {newTitle, id} = req.body
     await Posts.update({title:newTitle},{where:{id:id}})
     res.json(newTitle)
})
//edit postDesc
router.put('/desc', validateToken, async(req,res)=>{
     const{newDesc, id} = req.body
     await Posts.update({desc:newDesc},{where:{id:id}})
     res.json(newDesc)
})
module.exports = router