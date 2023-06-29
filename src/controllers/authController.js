import * as services from "../services";
import { internalServerError } from "../middlewares/handle_error";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ err: 1, mess: "Not empty, please!" });
    const responsive = await services.register(req.body);

    return res.status(200).json(responsive);
  } catch (error) {
    console.log(error);
    internalServerError(res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ err: 1, mess: "Not empty, please!" });
    const responsive = await services.login(req.body);

    return res.status(200).json(responsive);
  } catch (error) {
    console.log(error);
    internalServerError(res);
  }
};
