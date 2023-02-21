import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/users-service";

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const user = await userService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    // if (error.name === "DuplicatedEmailError") {
    //   return res.status(httpStatus.CONFLICT).send(error);
    // }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
