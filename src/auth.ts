import { User } from "./entity/User";
import { sign } from "jsonwebtoken";
import environment from '../src/config/environment';

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, environment.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });
};
