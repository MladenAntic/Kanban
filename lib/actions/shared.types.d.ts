import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface CreateNewBoardParams {
  name: string;
  columns: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface DeleteBoardParams {
  boardId: string;
  name: string;
  path: string;
}

export interface EditBoardParams {
  id: string;
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

export interface CreateNewTaskParams {
  title: string;
  description?: string;
  subtasks?: string[];
  status: string;
  author: Schema.Types.ObjectId | IUser;
  board: string;
  path: string;
}

export interface EditTaskParams {
  id: string,
  title: string;
  description?: string;
  subtasks?: string[];
  status: string;
  path: string;
}
