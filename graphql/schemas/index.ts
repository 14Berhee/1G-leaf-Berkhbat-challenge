import { mergeTypeDefs } from "@graphql-tools/merge";
import taskSchema from "@schemas/task-schema";

console.log(taskSchema); // Check if the schema is loaded correctly

export default mergeTypeDefs([taskSchema]);
