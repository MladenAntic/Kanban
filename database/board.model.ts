import { Schema, models, model, Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  columns: string[];
  author: Schema.Types.ObjectId;
}

const BoardSchema = new Schema({
  name: { type: String, required: true },
  columns: [{ type: String, required: true }],
  author: {
    type: Schema.Types.ObjectId,
  },
});

const Board = models.Board || model("Board", BoardSchema);

export default Board;