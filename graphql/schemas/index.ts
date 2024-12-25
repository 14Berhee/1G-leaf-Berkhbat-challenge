import { mergeTypeDefs } from "@graphql-tools/merge";
import taskSchema from "@schemas/task-schema";

console.log(taskSchema);

export default mergeTypeDefs([taskSchema]);
