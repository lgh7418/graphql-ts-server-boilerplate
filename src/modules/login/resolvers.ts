import { ResolverMap } from "../../types/graphql-utils";
import GQL = require("../../types/schema");
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import createJWT from "../../utils/createJWT";

const errorResponse = {
  ok: false,
  error: "이메일이나 비밀번호가 잘못되었습니다.",
  token: null,
};

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => "bye",
  },
  Mutation: {
    login: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return errorResponse;
      }

      if (!user.confirmed) {
        return {
          ok: false,
          error: "이메일 인증을 해주세요.",
          token: null,
        };
      }

      const valid = await bcrypt.compare(password, user.password);

      if (valid) {
        const token = createJWT(user.id);
        return {
          ok: true,
          error: null,
          token,
        };
      } else {
        return errorResponse;
      }
    },
  },
};
