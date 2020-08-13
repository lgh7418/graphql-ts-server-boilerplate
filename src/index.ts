import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { resolvers } from "./resolvers";
import { createTypeormConn } from "./utils/createTypeormConn";

export const startServer = async () => {
  const loadedFiles = loadFilesSync(`${__dirname}/*.graphql`);
  const typeDefs = mergeTypeDefs(loadedFiles);

  const server = new GraphQLServer({ typeDefs, resolvers });
  await createTypeormConn();
  await server.start(() => console.log("Server is running on localhost:4000"));
};

startServer();
