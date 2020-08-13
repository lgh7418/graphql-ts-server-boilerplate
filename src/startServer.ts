import { GraphQLServer } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { createTypeormConn } from "./utils/createTypeormConn";

export const startServer = async () => {
  const typeDefs = mergeTypeDefs(
    loadFilesSync(`${__dirname}/modules/**/*.graphql`)
  );
  const resolvers = mergeResolvers(
    loadFilesSync(`${__dirname}/modules/**/resolvers.ts`)
  );

  const server = new GraphQLServer({ typeDefs, resolvers });
  await createTypeormConn();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log("Server is running on localhost:4000");

  return app;
};
