import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import userRepository from "../../repositories/user-respository/index";

export async function createUser({
  email,
  password,
}: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);
  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw { message: "There is already an user with given email" };
  }
}

export type CreateUserParams = Pick<User, "email" | "password">;

const userService = {
  createUser,
};

export default userService;
