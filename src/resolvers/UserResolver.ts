import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Field,
    UseMiddleware,
    Ctx,
    Int
  } from "type-graphql";

  import { hash, compare } from "bcryptjs";
  import { User } from "../entity/User";
  import { isAuth } from "../isAuth";
  import { MyContext } from "../MyContext";
  import { createRefreshToken, createAccessToken } from "../auth";
  import { sendRefreshToken } from "../sendRefreshToken";
  import { getConnection } from "typeorm";
  
  
  @ObjectType()
  class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User;
  }

  @Resolver()
  export class UserResolver {
    
    @Query(() => String)
    @UseMiddleware(isAuth)
    async Me(@Ctx() { payload }: MyContext) {
      return `Your user id : ${payload!.userId}`;
    }

    @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }
  
    @Mutation(() => Boolean)
    async SignUp(
      @Arg("name") name: string,
      @Arg("email") email: string,
      @Arg("password") password: string
    ) {
      const hashedPassword = await hash(password, 13);
      
      try {
        await User.insert({
          name,
          email,
          password: hashedPassword
        });
      } catch (err) {
        console.log(err);
        return false;
      }
  
      return true;
    }
  
    @Mutation(() => LoginResponse)
    async login(
      @Arg("email") email: string,
      @Arg("password") password: string,
      @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Could not find user");
      }
      
  // Compare password
      const verify = await compare(password, user.password);
  
      if (!verify) {
        throw new Error("Wrong password");
      }

  // login successful
  sendRefreshToken(res, createRefreshToken(user));

  return {
    accessToken: createAccessToken(user),
    user
  };
}
  }