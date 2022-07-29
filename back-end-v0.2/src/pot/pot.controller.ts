import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { PotService } from "./pot.service";
import { CreatePotDto } from "./dto/create-pot.dto";
import { EditPotDto } from "./dto/edit-pot.dto";
import { GetUserId } from "../common/decorators/get-user-id.decorator";

@Controller("pots")
export class PotController {
  constructor(private readonly potService: PotService) {}

  @Post("create")
  createPot(@GetUserId() userId: number, @Body() createPotDto: CreatePotDto) {
    return this.potService.createPot(userId, createPotDto);
  }

  @Get("my")
  getPots(@GetUserId() userId: number) {
    return this.potService.getPots(userId);
  }

  @Get(":id")
  getPotById(
    @GetUserId() userId: number,
    @Param("id", ParseIntPipe) potId: number,
  ) {
    return this.potService.getPotById(userId, potId);
  }

  @Patch("edit/:id")
  editPot(
    @GetUserId() userId: number,
    @Param("id", ParseIntPipe) potId: number,
    @Body() updatePotDto: EditPotDto,
  ) {
    return this.potService.editPot(userId, potId, updatePotDto);
  }

  @Delete("delete/:id")
  deletePotById(
    @GetUserId() userId: number,
    @Param("id", ParseIntPipe) potId: number,
  ) {
    return this.potService.deletePotById(userId, potId);
  }
}
