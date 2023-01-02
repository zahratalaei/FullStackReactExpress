module.exports = (sequelize,DataTypes)=>{
     const Posts = sequelize.define("Posts",{
          title: {
               type: DataTypes.STRING,
               allowNull:false,
          },
          desc: {
               type: DataTypes.TEXT,
               allowNull:false,
          },
          author: {
               type: DataTypes.STRING,
               allowNull:false,
          },
          image: {
               type: DataTypes.STRING,
          }

     })
     Posts.associate = (models) =>{
          Posts.hasMany(models.Comments, {
               onDelete:"cascade"
          })
     }

     return Posts
}