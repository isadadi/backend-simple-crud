import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  } catch (error: any) {
    res.status(401).send({ message: "Unauthorized", error: error.message });
  }
};
