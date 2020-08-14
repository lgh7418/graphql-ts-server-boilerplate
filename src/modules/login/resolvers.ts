import { ResolverMap } from "../../types/graphql-utils";
import GQL = require("../../types/schema");
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { invalidLogin } from "./errorMessages";
import { confirmEmail } from "../../routes/confirmEmail";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin,
  },
];

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => "bye",
  },
  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session }
    ) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return errorResponse;
      }

      if (!user.confirmed) {
        return [
          {
            path: "email",
            message: confirmEmail,
          },
        ];
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return errorResponse;
      }

      session.userId = user.id;

      return null;
    },
  },
};
