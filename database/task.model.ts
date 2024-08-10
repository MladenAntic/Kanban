import { Schema, models, model, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  subtasks?: string[];
  status: string[];
  author: Schema.Types.ObjectId;
  board: Schema.Types.ObjectId;
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  subtasks: [{ type: String }],
  status: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
