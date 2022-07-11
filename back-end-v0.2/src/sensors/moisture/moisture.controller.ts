import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { MoistureService } from "./moisture.service";
import { CreateMoistureDto } from "./dto";

@Controller("moisture")
export class MoistureController {
  constructor(private readonly moistureService: MoistureService) {}

  @Post()
  create(@Body() createMoistureDto: CreateMoistureDto) {
    return this.moistureService.create(createMoistureDto);
  }

  @Get()
  findAll() {
    return this.moistureService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.moistureService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.moistureService.remove(+id);
  }
}
