import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = mergeTypeDefs(
  loadFilesSync(`${__dirname}/modules/**/*.graphql`)
);
const resolvers = mergeResolvers(
  loadFilesSync(`${__dirname}/modules/**/resolvers.ts`)
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
