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
import { HumidityService } from "./humidity.service";
import { CreateHumidityDto, EditHumidityDto } from "./dto";
import { GetUserId } from "../../common/decorators";

@Controller("sensors/humidity")
export class HumidityController {
  constructor(private readonly humidityService: HumidityService) {}

  @Post("?")
  createHumidity(
    @Body() createHumidityDto: CreateHumidityDto,
    @Query("potId") potId: number,
  ) {
    return this.humidityService.createHumidity(+potId, createHumidityDto);
  }

  @Get("all?")
  getAllHumidity(@Query("potId") potId: number) {
    return this.humidityService.getAllHumidity(+potId);
  }

  @Get(":id")
  getHumidityById(@Param("id") id: number) {
    return this.humidityService.getHumidityById(+id);
  }

  @Patch(":id/edit?")
  editHumidity(
    @GetUserId() userId: number,
    @Param("id") id: number,
    @Query("potId") potId: number,
    @Body() editHumidityDto: EditHumidityDto,
  ) {
    return this.humidityService.editHumidity(+id, +userId, +potId, editHumidityDto);
  }

  @Delete(":id?")
  deleteHumidityById(
    @GetUserId() userId: number,
    @Param("id") id: number,
    @Query("potId") potId: number,
  ) {
    return this.humidityService.deleteHumidityById(+userId, +potId, +id);
  }
}
