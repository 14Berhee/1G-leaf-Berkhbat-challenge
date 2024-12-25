import Task from "../../../mongoose/models/task-model";
import { ITask } from "../../../mongoose/models/task-model";

const taskResolvers = {
  Mutation: {
    async addTask(
      _: any,
      {
        taskName,
        description,
        priority,
        tags,
      }: Omit<ITask, "_id" | "createdAt" | "updatedAt">
    ) {
      if (description.length < 10) {
        throw new Error("Description must be at least 10 characters long.");
      }
      const newTask = new Task({ taskName, description, priority, tags });
      return await newTask.save();
    },
  },
};

export default taskResolvers;
