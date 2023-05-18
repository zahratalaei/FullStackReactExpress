require('dotenv').config()
module.exports ={  
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    //add port for dockerising 
    // "port":"3306",
    "dialect": "mysql",
    "ssl": {
      rejectUnauthorized: true,
    },
    
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "ssl":true,
    "ssl_ca":"/path/to/ca.pem",
    "dialectOptions": {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  }
}
