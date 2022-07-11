import { Module } from "@nestjs/common";
import { PotService } from "./pot.service";
import { PotController } from "./pot.controller";

@Module({
  controllers: [PotController],
  providers: [PotService],
})
export class PotModule {}
