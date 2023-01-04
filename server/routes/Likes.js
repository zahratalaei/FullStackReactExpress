const express = require('express')
const { Op } = require('sequelize')
const { validateToken } = require('../middlewares/AuthMiddleware')
const router =  express.Router()
const{Likes} = require('../models')
 
router.post('/',validateToken, async(req,res)=>{
     const userId = req.user.id;
     const {postId} = req.body;
     const liked = await Likes.findOne({where:{PostId:postId,UserId:userId}})
     liked  ? await Likes.destroy({where:{PostId:postId,UserId:userId}}):await Likes.create({PostId:postId, UserId:userId})
     res.json(liked)

})

router.get('/:postId',async(req,res)=>{
     const postId = req.params.postId;
     const likes = await Likes.findAll({where:{PostId : postId}})
     res.json(likes)
})

module.exports = router