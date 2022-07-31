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
import { TemperatureService } from "./temperature.service";
import { CreateTemperatureDto, EditTemperatureDto } from "./dto";
import { GetUserId } from "../../common/decorators";

@Controller("sensors/temperature")
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}

  @Post("?")
  createTemperature(
    @Body() createTemperatureDto: CreateTemperatureDto,
    @Query("potId") potId: number,
  ) {
    return this.temperatureService.createTemperature(
      +potId,
      createTemperatureDto,
    );
  }

  @Get("all?")
  getAllTemperature(@Query("potId") potId: number) {
    return this.temperatureService.getAllTemperature(+potId);
  }

  @Get(":id")
  getTemperatureById(@Param("id") id: string) {
    return this.temperatureService.getTemperatureById(+id);
  }

  @Patch(":id/edit?")
  editTemperature(
    @GetUserId() userId: number,
    @Param("id") id: number,
    @Query("potId") potId: number,
    @Body() editTemperatureDto: EditTemperatureDto,
  ) {
    return this.temperatureService.editTemperature(
      +id,
      +userId,
      +potId,
      editTemperatureDto,
    );
  }

  @Delete(":id")
  deleteTemperatureById(
    @GetUserId() userId: number,
    @Param("id") id: string,
    @Query("potId") potId: number,
  ) {
    return this.temperatureService.deleteTemperatureById(+userId, +potId, +id);
  }
}
