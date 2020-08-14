import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { stitchSchemas } from "@graphql-tools/stitch";

export const genSchema = () => {
  const typeDefs = mergeTypeDefs(
    loadFilesSync(`${__dirname}/modules/**/*.graphql`)
  );
  const resolvers = mergeResolvers(
    loadFilesSync(`${__dirname}/modules/**/resolvers.ts`)
  );

  return stitchSchemas({
    typeDefs,
    resolvers,
  });
};
