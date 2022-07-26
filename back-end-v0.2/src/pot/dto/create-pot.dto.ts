import { Humidity, Moisture, Temperature } from "@prisma/client";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePotDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsArray()
  temperature?: Temperature[]

  @IsOptional()
  @IsArray()
  humidity?: Humidity[]

  @IsOptional()
  @IsArray()
  moisture?: Moisture[]
}
