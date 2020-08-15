import { ResolverMap } from "../../types/graphql-utils";
import privateResolver from "../../utils/privateResolver";

export const resolvers: ResolverMap = {
  Query: {
    me: privateResolver(async (_, __, { req }) => {
      const { user } = req;
      return user;
    }),
  },
};
export default resolvers;
