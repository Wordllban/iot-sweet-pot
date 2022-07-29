import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}