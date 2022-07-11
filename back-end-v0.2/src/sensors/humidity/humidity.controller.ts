import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { HumidityService } from "./humidity.service";
import { CreateHumidityDto } from "./dto";

@Controller("humidity")
export class HumidityController {
  constructor(private readonly humidityService: HumidityService) {}

  @Post()
  create(@Body() createHumidityDto: CreateHumidityDto) {
    return this.humidityService.create(createHumidityDto);
  }

  @Get()
  findAll() {
    return this.humidityService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.humidityService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.humidityService.remove(+id);
  }
}
