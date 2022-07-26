import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      console.log("DECORATOR GET USER with data", request.user);
      return request.user[data];
    }
    console.log("DECORATOR GET USER", request.user);
    return request.user;
  },
);
