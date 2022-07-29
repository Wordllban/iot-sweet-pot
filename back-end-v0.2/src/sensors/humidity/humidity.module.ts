import { Module } from "@nestjs/common";
import { HumidityService } from "./humidity.service";
import { HumidityController } from "./humidity.controller";

@Module({
  controllers: [HumidityController],
  providers: [HumidityService],
})
export class HumidityModule {}
