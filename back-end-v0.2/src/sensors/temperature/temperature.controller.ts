import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { TemperatureService } from "./temperature.service";
import { CreateTemperatureDto } from "./dto";

@Controller("sensors/temperature")
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}

  @Post()
  create(@Body() createTemperatureDto: CreateTemperatureDto) {
    return this.temperatureService.create(createTemperatureDto);
  }

  @Get()
  findAll() {
    return this.temperatureService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.temperatureService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.temperatureService.remove(+id);
  }
}
