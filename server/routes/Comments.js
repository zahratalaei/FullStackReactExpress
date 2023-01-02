const express = require('express')
const router = express.Router()
const {Comments, Users, sequelize} = require('../models')
const {validateToken} = require('../middlewares/AuthMiddleware')
const { QueryTypes } = require('sequelize')

// get comments
router.get('/',  (req,res)=>{          
          const comments =  sequelize.query("SELECT a.*,b.photo,b.username FROM Comments a JOIN Users b ON a.UserId = b.id")
     res.json(comments)
})
// add a comment
router.post('/addComment', validateToken, async (req,res)=>{
     const comment = req.body
     comment.commenter = req.user.username
     comment.UserId = req.user.id
     await Comments.create(comment)
     res.json(comment)
})
// get comments by postId
router.get('/:postId',async(req,res)=>{
     const postId = req.params.postId
     // const comments = await Comments.findAll({where:{PostId : postId},includes:[Users]})
     const comments = await sequelize.query(`SELECT a.*,b.photo,b.username FROM Comments a JOIN Users b ON a.UserId = b.id AND PostId = ${postId}`,{type:QueryTypes.SELECT})
     
     res.json(comments)
})

// delete a comment
router.delete('/:commentId',validateToken, async (req,res)=>{
     const commentId = req.params.commentId

     await Comments.destroy({where:{id:commentId}})
     res.json("Deleted comment")
})


module.exports = router