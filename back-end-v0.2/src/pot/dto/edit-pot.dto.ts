import { Temperature, Humidity, Moisture } from "@prisma/client";
import { IsNotEmpty, IsString, IsOptional, IsArray } from "class-validator";

export class EditPotDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

    @IsOptional()
  @IsArray()
  temperature?: Temperature[];

  @IsOptional()
  @IsArray()
  humidity?: Humidity[];

  @IsOptional()
  @IsArray()
  moisture?: Moisture[];
}
