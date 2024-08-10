import { Schema, models, model, Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  columns: string[];
  tasks: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
}

const BoardSchema = new Schema({
  name: { type: String, required: true },
  columns: [{ type: String, required: true }],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Board = models.Board || model("Board", BoardSchema);

export default Board;
