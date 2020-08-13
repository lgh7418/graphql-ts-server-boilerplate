import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

import { resolvers } from "./resolvers";
import { createConnection } from "typeorm";

const loadedFiles = loadFilesSync(`${__dirname}/*.graphql`);
const typeDefs = mergeTypeDefs(loadedFiles);

const server = new GraphQLServer({ typeDefs, resolvers });
createConnection().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
