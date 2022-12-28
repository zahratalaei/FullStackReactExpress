const express = require('express')
const app = express()
app.use(express.json())
const db= require('./models')
const cors = require('cors')
const path = require('path')
// const fs = require('fs')

app.use(cors())

//static Image Folder
// app.use('/Images', express.static(path.join(__dirname ,'./Images')))
app.use('/Images/Posts', express.static(path.join(__dirname ,'./Images/Posts')))
//Routers
const postRouter =  require('./routes/Posts')
app.use('/posts',postRouter)

const commentRouter = require('./routes/Comments')
app.use('/comments', commentRouter)
//port
const PORT = process.env.PORT || 4001

//server
db.sequelize.sync().then(()=>{
     app.listen(PORT, ()=>{
          console.log(`server is running on port ${PORT}` )
     
     })
})

