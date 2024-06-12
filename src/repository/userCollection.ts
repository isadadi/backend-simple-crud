import bcrypt from "bcryptjs";

import { db } from "../config/firebaseConfig";
import { User } from "../types/user";

export const getUserData = async (userId: string) => {
  const userDoc = await db.collection("USERS").doc(userId).get();
  return userDoc.exists ? (userDoc.data() as User) : null;
};

export const editUserData = (userId: string, data: any) =>
  db.collection("USERS").doc(userId).update(data);

export const createUser = async (
  email: string,
  name: string,
  password: string
) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = { email, name, passwordHash };
  return db.collection("USERS").doc().create(newUser);
};

export const getUserByEmail = async (email: string) => {
  const snapshot = await db
    .collection("USERS")
    .where("email", "==", email)
    .get();
  if (snapshot.empty) {
    return null;
  }

  const userData = snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as User)
  );

  return userData[0];
};
