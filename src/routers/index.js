import authRouter from "./authRouter";
import { notFound } from "../middlewares/handle_error";

const initRouter = (app) => {
  app.use("/api/v1/auth", authRouter);

  app.use(notFound);
};
module.exports = initRouter;
