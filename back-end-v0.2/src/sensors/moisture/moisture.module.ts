import { Module } from "@nestjs/common";
import { MoistureService } from "./moisture.service";
import { MoistureController } from "./moisture.controller";

@Module({
  controllers: [MoistureController],
  providers: [MoistureService],
})
export class MoistureModule {}
