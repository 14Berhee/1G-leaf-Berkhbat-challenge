import { gql } from "apollo-server-cloud-functions";

const taskSchema = gql`
  type Task {
    _id: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String]
    createdAt: String!
    updatedAt: String!
  }

  input TaskInput {
    taskName: String!
    description: String!
    priority: Int!
    isDone: Boolean
    tags: [String]
  }

  type Query {
    getTask(id: ID!): Task
    getAllTasks: [Task]
  }

  type Mutation {
    createTask(input: TaskInput!): Task
    updateTask(id: ID!, input: TaskInput!): Task
    deleteTask(id: ID!): Boolean
  }
`;

export default taskSchema;
