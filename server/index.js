const express = require('express')
const app = express()
app.use(express.json())
const db= require('./models')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

app.use(cors())

//static Image Folder
app.use('/Images/Posts', express.static(path.join(__dirname ,'./Images/Posts')))
app.use('/Images/Users', express.static(path.join(__dirname ,'./Images/Users')))
//Routers
const postRouter =  require('./routes/Posts')
app.use('/posts',postRouter)

const commentRouter = require('./routes/Comments')
app.use('/comments', commentRouter)

const userRouter = require('./routes/Users')
app.use('/auth',userRouter)

const likeRouter = require('./routes/Likes')
app.use('/likes',likeRouter)
//port
const PORT = process.env.PORT || 4001
 //server
// db.sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });
//server
db.sequelize.sync().then(( )=>{
     app.listen(PORT, ()=>{
          console.log(`server is running on port ${PORT}` )
     
     })
}).catch((err)=> {
     console.log(err)
})

