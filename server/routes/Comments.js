const express = require('express')
const router = express.Router()
const {Comments} = require('../models')

// get comments
router.get('/', async (req,res)=>{
     const comments = await Comments.findAll()
     res.json(comments)
})
// add a comment
router.post('/addComment', async (req,res)=>{
     const comment = req.body
     await Comments.create(comment)
     res.json(comment)
})
// get comments by postId
router.get('/:postId',async(req,res)=>{
     const postId = req.params.postId
     const comments = await Comments.findAll({where:{PostId : postId}})
     res.json(comments)
})
module.exports = router