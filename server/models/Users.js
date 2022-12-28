module.exports = (sequelize,DataType)=>{
     const Users = sequelize.define("Users",{
          username :{
               type: DataType.STRING,
               allowNull: false
          },
          password:{
               type: DataType.STRING,
               allowNull: false
          },
          photo:{
               type: DataType.STRING
          }
     })
     Users.associate = (models) => {
          Users.hasMany(models.Posts),{
               onDelete: "cascade"
          },
          Users.hasMany(models.Comments),{
               onDelete: "cascade"
          }
     }
     return Users;
}