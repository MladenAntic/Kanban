"use server";

import Board from "@/database/board.model";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import {
  CreateNewBoardParams,
  DeleteBoardParams,
  EditBoardParams,
} from "./shared.types";
import Task from "@/database/task.model";

export const createNewBoard = async (params: CreateNewBoardParams) => {
  try {
    connectToDatabase();

    const { name, columns, author, path } = params;

    // eslint-disable-next-line no-unused-vars
    const board = await Board.create({
      name,
      columns,
      author,
    });

    revalidatePath(path);
  } catch (error) {
    console.log("=> createNewBoard error", error);
  }
};

export const getBoards = async (params: any) => {
  try {
    connectToDatabase();

    const { author } = params;

    const boards = await Board.find({author});

    return { boards };
  } catch (error) {
    console.log("=> getBoards error", error);
  }
};

export const deleteBoard = async (params: DeleteBoardParams) => {
  try {
    connectToDatabase();

    const { boardId, name, path } = params;

    await Board.deleteOne({ name });

    await Task.deleteMany({ board: boardId });

    revalidatePath(path);
  } catch (error) {
    console.log("=> deleteBoard error", error);
  }
};

export const editBoard = async (params: EditBoardParams) => {
  try {
    connectToDatabase();

    const { id, name, columns, path } = params;

    await Board.findByIdAndUpdate(id, { name, columns });

    revalidatePath(path);
  } catch (error) {
    console.log("=> editBoard error", error);
  }
};

export const addColumnToBoard = async (
  boardId: string,
  columnName: string,
  path: string
) => {
  try {
    await connectToDatabase();

    await Board.findByIdAndUpdate(boardId, {
      $push: { columns: columnName },
    });

    revalidatePath(path);
  } catch (error) {
    console.error("=> addColumnToBoard error", error);
  }
};
