import * as jwt from "jsonwebtoken";

const createJWT = (id: string): string => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_TOKEN as string,
    {
      expiresIn: "15min",
    }
  );
  return token;
};

export default createJWT;
