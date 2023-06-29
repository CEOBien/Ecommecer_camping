const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const connectDB = require("./src/config/db.config");
const app = express();
const initRouter = require("./src/routers/index");

app.use(
  cors({
    origin: process.env.URL,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//config swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nodejs inter",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:9999/",
      },
    ],
  },
  apis: ["index.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//connect mysql
connectDB();

//ROUTER
initRouter(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("App is listening on Port " + PORT);
});
