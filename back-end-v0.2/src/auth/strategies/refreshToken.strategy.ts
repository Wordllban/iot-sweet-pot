import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "rt-secret",
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const hashedRefreshToken = req
      ?.get("authorization")
      ?.replace("Bearer", "")
      .trim();
      
    return {
      ...payload,
      hashedRefreshToken,
    };
  }
}
