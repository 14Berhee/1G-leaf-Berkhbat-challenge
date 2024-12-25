import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from "graphql";
import Task from "../../../mongoose/models/task-model";

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    _id: { type: GraphQLID },
    taskName: { type: GraphQLString },
    description: { type: GraphQLString },
    isDone: { type: GraphQLBoolean },
    priority: { type: GraphQLInt },
    tags: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const TaskInputType = new GraphQLInputObjectType({
  name: "TaskInput",
  fields: {
    taskName: { type: GraphQLString },
    description: { type: GraphQLString },
    priority: { type: GraphQLInt },
    isDone: { type: GraphQLBoolean },
    tags: { type: new GraphQLList(GraphQLString) },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllTasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        return Task.find();
      },
    },
    getTaskById: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Task.findById(args.id);
      },
    },
    searchTasks: {
      type: new GraphQLList(TaskType),
      args: {
        searchTerm: { type: GraphQLString },
        priority: { type: GraphQLInt },
        isDone: { type: GraphQLBoolean },
        createdBefore: { type: GraphQLString },
        createdAfter: { type: GraphQLString },
      },
      resolve(parent, args) {
        let filters = {};

        return Task.find(filters);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createTask: {
      type: TaskType,
      args: {
        input: { type: TaskInputType },
      },
      async resolve(parent, args) {
        const { taskName, description, priority, isDone, tags } = args.input;

        if (description.length < 10) {
          throw new Error("Description must be at least 10 characters long");
        }
        if (priority < 1 || priority > 5) {
          throw new Error("Priority must be between 1 and 5");
        }

        const newTask = new Task({
          taskName,
          description,
          priority,
          isDone: isDone ?? false,
          tags: tags || [],
        });

        return await newTask.save();
      },
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: GraphQLID },
        input: { type: TaskInputType },
      },
      async resolve(parent, args) {
        const { id, input } = args;
        const { taskName, description, priority, isDone, tags } = input;

        if (priority && (priority < 1 || priority > 5)) {
          throw new Error("Priority must be between 1 and 5");
        }

        const updatedTask = await Task.findByIdAndUpdate(
          id,
          {
            taskName,
            description,
            priority,
            isDone,
            tags,
            updatedAt: new Date(),
          },
          { new: true }
        );

        return updatedTask;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
