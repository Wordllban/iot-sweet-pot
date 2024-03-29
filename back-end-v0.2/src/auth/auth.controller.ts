import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { GetUser, GetUserId, Public } from "../common/decorators";
import { AccessTokenGuard, RefreshTokenGuard } from "../common/guards";
import { AuthService } from "./auth.service";
import { AuthInDto, AuthUpDto } from "./dto";
import { Tokens } from "./types";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("local/signup")
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthUpDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post("local/signin")
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthInDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@GetUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetUserId() userId: number,
    @GetUser("hashedRefreshToken") hashedRefreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, hashedRefreshToken);
  }
}
