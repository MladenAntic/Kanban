import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface CreateNewBoardParams {
  name: string;
  columns: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface DeleteBoardParams {
  name: string;
  path: string;
}

export interface EditBoardParams {
  name: string;
  columns: string[];
  path: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
}

export interface DeleteUserParams {
  clerkId: string;
}
