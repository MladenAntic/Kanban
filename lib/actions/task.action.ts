"use server";

import Task from "@/database/task.model";
import { connectToDatabase } from "../mongoose";
import { CreateNewTaskParams, EditTaskParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Board from "@/database/board.model";

export const createNewTask = async (params: CreateNewTaskParams) => {
  try {
    connectToDatabase();

    const { title, description, subtasks, status, author, board, path } =
      params;

    // eslint-disable-next-line no-unused-vars
    const task = await Task.create({
      title,
      description,
      subtasks,
      status,
      author,
      board,
    });

    // Update the board to include the new task
    await Board.findByIdAndUpdate(board, { $push: { tasks: task._id } });
    
    revalidatePath(path)
  } catch (error) {
    console.log("=> createNewTask error", error);
  }
};

export const getTasks = async (params: any) => {
  try {
    connectToDatabase();

    const { author } = params;

    const tasks = await Task.find({ author });

    return { tasks };
  } catch (error) {
    console.log("=> getTasks error", error);
  }
};

export const editTask = async (params: EditTaskParams) => {
  try {
    connectToDatabase();

    const { id, title, description, subtasks, status, path } = params;

    await Task.findByIdAndUpdate(id, { title, description, subtasks, status });

    revalidatePath(path);
  } catch (error) {
    console.log("=> editTask error", error);
  }
};

export const deleteTask = async (params: any) => {
  try {
    connectToDatabase();

    const { taskId, path, board } = params;

    await Task.deleteOne({ _id: taskId });
    await Board.findByIdAndUpdate(board, { $pull: { tasks: taskId } });

    revalidatePath(path);
  } catch (error) {
    console.log("=> deleteBoard error", error);
  }
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  try {
    connectToDatabase();

    await Task.findByIdAndUpdate(taskId, { status });
  } catch (error) {
    console.log("=> updateTaskStatus error", error);
  }
};
