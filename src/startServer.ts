import { GraphQLServer } from "graphql-yoga";
import { createTypeormConn } from "./utils/createTypeormConn";
import schema from "./schema";
import { confirmEmail } from "./routes/confirmEmail";
import { jwt } from "./middlewares";
import decodeJWT from "./utils/decodeJWT";

export const startServer = async () => {
  const server = new GraphQLServer({
    schema,
    context: (req) => {
      return { req: req.request };
    },
  });

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "development"
        ? "*"
        : (process.env.PRONTEND_HOST as string),
  };

  server.express.use(jwt);

  server.express.get("/confirm/:id", confirmEmail);

  await createTypeormConn();
  const port = process.env.NODE_ENV === "test" ? 0 : 4000;
  const app = await server.start({
    cors,
    port,
    subscriptions: {
      onConnect: async (connectionParams: any) => {
        const token = connectionParams["X-JWT"];
        if (token) {
          const user = await decodeJWT(token);
          if (user) {
            return {
              currentUser: user,
            };
          }
        }
        throw new Error("No JWT.");
      },
    },
  });
  console.log(`Server is running on localhost:${port}`);

  return app;
};
