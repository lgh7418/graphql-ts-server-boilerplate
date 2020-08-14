import { GraphQLServer } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { createTypeormConn } from "./utils/createTypeormConn";
import { User } from "./entity/User";
import { redis } from "./redis";

export const startServer = async () => {
  const typeDefs = mergeTypeDefs(
    loadFilesSync(`${__dirname}/modules/**/*.graphql`)
  );
  const resolvers = mergeResolvers(
    loadFilesSync(`${__dirname}/modules/**/resolvers.ts`)
  );

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
    }),
  });

  server.express.get("/confirm/:id", async (req, res) => {
    const { id } = req.params;
    const userId = await redis.get(id);
    if (userId) {
      await User.update({ id: userId }, { confirmed: true });
      res.send("ok");
    } else {
      res.send("invalid");
    }
  });

  await createTypeormConn();
  const port = process.env.NODE_ENV === "test" ? 0 : 4000;
  const app = await server.start({
    port,
  });
  console.log(`Server is running on localhost:${port}`);

  return app;
};
