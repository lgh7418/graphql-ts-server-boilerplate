import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN as string);
    const { id } = decoded;
    const user = await User.findOne({ id });
    return user;
  } catch (err) {
    return undefined;
  }
};

export default decodeJWT;
