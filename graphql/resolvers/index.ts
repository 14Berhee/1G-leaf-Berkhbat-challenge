import { mergeResolvers } from "@graphql-tools/merge";
import taskResolvers from "./mutations/task-mutation";

export default mergeResolvers([taskResolvers]);
