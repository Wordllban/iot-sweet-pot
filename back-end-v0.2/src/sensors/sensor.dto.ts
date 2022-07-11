import { IsNotEmpty, IsNumberString } from "class-validator";

export class SensorDto {
  @IsNumberString()
  @IsNotEmpty()
  value: number | string;
}
