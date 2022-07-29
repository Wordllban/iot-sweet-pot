import {
  IsOptional,
  IsString,
} from "class-validator";

export class EditSensorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  model?: string;
}
