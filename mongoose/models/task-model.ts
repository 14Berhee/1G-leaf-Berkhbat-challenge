import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  taskName: string;
  description: string;
  isDone?: boolean;
  priority: number;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    taskName: { type: String, required: true },
    description: { type: String, required: true, minlength: 10 },
    isDone: { type: Boolean, default: false },
    priority: { type: Number, required: true, min: 1, max: 5 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Task: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
