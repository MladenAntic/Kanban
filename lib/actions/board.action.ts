"use server";

import Board from "@/database/board.model";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { CreateNewBoardParams, DeleteBoardParams, EditBoardParams } from "./shared.types";

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

    const boards = await Board.find({});

    return { boards };
  } catch (error) {
    console.log("=> getBoards error", error);
  }
};

export const deleteBoard = async (params: DeleteBoardParams) => {
  try {
    connectToDatabase();

    const { name, path } = params;

    await Board.deleteOne({ name });

    revalidatePath(path);
  } catch (error) {
    console.log("=> deleteBoard error", error);
  }
};

export const editBoard = async (params: EditBoardParams) => {
  try {
    connectToDatabase();

    const { name, columns, path } = params;

    await Board.findOneAndUpdate({ name, columns });

    revalidatePath(path);
  } catch (error) {
    console.log("=> editBoard error", error);
  }
};
