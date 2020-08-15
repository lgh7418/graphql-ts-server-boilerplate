import { Resolver } from "../types/graphql-utils";

const privateResolver = (resolverFunc: Resolver) => async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.req.user) {
    throw new Error("No JWT");
  }
  const resolved = await resolverFunc(parent, args, context, info);
  return resolved;
};

export default privateResolver;
