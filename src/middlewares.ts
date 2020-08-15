import decodeJWT from "./utils/decodeJWT";
import { Response, NextFunction } from "express";

export const jwt = async (req: any, res: Response, next: NextFunction) => {
  const token = req.get("X-JWT");
  if (token) {
    const user = await decodeJWT(token);
    if (user) {
      req.user = user;
    } else {
      req.user = undefined;
    }
  }
  res.status(200);
  next();
};
