import { Request, Response, NextFunction } from "express";
import { editUserData, getUserData } from "../repository/userCollection";

export const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, data } = req.body;

    await editUserData(userId, data);
    res.status(200).send({ message: "User data updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const fetchUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await getUserData(userId);
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    next(error);
  }
};
