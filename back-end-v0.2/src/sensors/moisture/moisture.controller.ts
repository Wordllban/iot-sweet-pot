import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from "@nestjs/common";
import { MoistureService } from "./moisture.service";
import { CreateMoistureDto } from "./dto";
import { GetUserId } from "../../common/decorators";
import { EditMoistureDto } from "../moisture/dto";

@Controller("sensors/moisture")
export class MoistureController {
  constructor(private readonly moistureService: MoistureService) {}

  @Post("?")
  createMoisture(
    @Body() createMoistureDto: CreateMoistureDto,
    @Query("potId") potId: number,
  ) {
    return this.moistureService.createMoisture(+potId, createMoistureDto);
  }

  @Get("all?")
  getAllMoisture(@Query("potId") potId: number) {
    return this.moistureService.getAllMoisture(+potId);
  }

  @Get(":id")
  getMoistureById(@Param("id") id: number) {
    return this.moistureService.getMoistureById(+id);
  }

  @Patch(":id/edit?")
  editMoisture(
    @GetUserId() userId: number,
    @Param("id") id: number,
    @Query("potId") potId: number,
    @Body() editMoistureDto: EditMoistureDto,
  ) {
    return this.moistureService.editMoisture(
      +id,
      +userId,
      +potId,
      editMoistureDto,
    );
  }

  @Delete(":id?")
  remove(
    @GetUserId() userId: number,
    @Param("id") id: number,
    @Query("potId") potId: number,
  ) {
    return this.moistureService.deleteMoistureById(+userId, +potId, +id);
  }
}
