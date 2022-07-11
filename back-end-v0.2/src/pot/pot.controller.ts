import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PotService } from "./pot.service";
import { CreatePotDto } from "./dto/create-pot.dto";
import { UpdatePotDto } from "./dto/update-pot.dto";

@Controller("pot")
export class PotController {
  constructor(private readonly potService: PotService) {}

  @Post()
  create(@Body() createPotDto: CreatePotDto) {
    return this.potService.create(createPotDto);
  }

  @Get()
  findAll() {
    return this.potService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.potService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePotDto: UpdatePotDto) {
    return this.potService.update(+id, updatePotDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.potService.remove(+id);
  }
}
