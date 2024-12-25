import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/schema.json", // JSON schema generated from introspection
  documents: "src/**/*.tsx", // Make sure you have GraphQL queries in your TSX files
  generates: {
    "src/gql/": {
      preset: "client", // Preset for client-side GraphQL integration (Apollo Client)
      plugins: [
        "typescript", // Generate TypeScript types for schema and operations
        "typescript-operations", // Generate types for operations (queries/mutations)
        "typescript-react-apollo", // Generate Apollo Client hooks for React
      ],
    },
  },
};

export default config;
