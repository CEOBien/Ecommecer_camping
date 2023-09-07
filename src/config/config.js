require("dotenv").config();
const mysql2 = require("mysql2");
const fs = require("fs");

module.exports = {
  config: {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: "mysql",
      dialectModule: mysql2,
      logging: false,
      port: process.env.DB_PORT,
    },
    test: {
      username: "root",
      password: "sesame",
      database: "wns-1",
      host: "127.0.0.1",
      dialect: "mysql",
      dialectModule: mysql2,
      logging: false,
      port: 3307,
    },
    production: {
      username: process.env.DB_USERNAME_PRODUCTION,
      password: process.env.DB_PASSWORD_PRODUCTION,
      database: process.env.DB_DATABASE_PRODUCTION,
      host: process.env.DB_HOST_PRODUCTION,
      dialect: "mysql",
      dialectModule: mysql2,
      logging: false,
      port: process.env.DB_POST_PRODUCTION,
    },
    // production_ssl: {
    //   username: process.env.DB_USERNAME_PRODUCTION,
    //   password: process.env.DB_PASSWORD_PRODUCTION,
    //   database: process.env.DB_DATABASE_PRODUCTION,
    //   host: process.env.DB_HOST_PRODUCTION,
    //   dialect: "mysql",
    //   dialectModule: mysql2,
    //   logging: false,
    //   port: 3306,
    //   ssl: true,
    //   dialectOptions: {
    //     ssl: {
    //       ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem')
    //     }
    //   }
    // },
  },
};
