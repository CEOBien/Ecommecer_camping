const express = require("express");
const createError = require("http-errors");
const logEvents = require("../helpers/logEvents.js");
const { v4: uuid } = require("uuid");
require("dotenv").config();

let router = express.Router();

let initWebRoutes = (app) => {
  // router.all(
  //   "*",
  //   authorize
  //   //  checkUserPermission
  // );

  router.use("/auth", require("./authRouter.js"));
  router.use("/menu", require("./menuRouer.js"));
  router.use("/gameCard", require("./gameCardRouter.js"));
  router.use("/category", require("./categoryRouter.js"));
  router.use("/profile", require("./profileRouter.js"));
  router.use("/addressUser", require("./addressUserRouter.js"));
  router.use("/blog", require("./blogRouter.js"));
  router.use("/commentBlog", require("./commentBlogRouter.js"));
  router.use("/product", require("./productRouter.js"));
  router.use("/cart", require("./cartRouter.js"));
  router.get("/", (req, res) => {
    res.send("hello there !");
  });

  router.use((req, res, next) => {
    next(createError.NotFound("Not Found !"));
  });

  router.use((err, req, res, next) => {
    let contentLog = `idError:${uuid()} --- ${req.url} --- ${req.method} --- ${
      err.message
    }`;
    logEvents(contentLog);
    if (!err.status) {
      err["status"] = 500;
    }
    res.status(err.status).json({
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    });
  });
  return app.use("/api", router);
};

module.exports = initWebRoutes;
