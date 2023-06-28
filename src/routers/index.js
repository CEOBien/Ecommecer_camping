import authRouter from "./authRouter";

const initRouter = (app) => {
  app.use("/api/v1/auth", authRouter);

  return app.use("/", (req, res) => {
    return res.send("SERVER ONN");
  });
};
module.exports = initRouter;
