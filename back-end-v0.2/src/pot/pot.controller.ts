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
import { GetUser } from "src/auth/decorator/get-user.decorator";

@Controller("pots")
export class PotController {
  constructor(private readonly potService: PotService) {}

  @Post("create")
  createPot(@GetUser("id") userId: number, @Body() createPotDto: CreatePotDto) {
    return this.potService.createPot(userId, createPotDto);
  }

  @Get("my")
  getPots(@GetUser("id") userId: number) {
    return this.potService.getPots(userId);
  }

  @Get(":id")
  getPotById(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) potId: number,
  ) {
    return this.potService.getPotById(userId, potId);
  }

  @Patch("edit/:id")
  editPot(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) potId: number,
    @Body() updatePotDto: EditPotDto,
  ) {
    return this.potService.editPot(userId, potId, updatePotDto);
  }

  @Delete("delete/:id")
  deletePotById(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) potId: number,
  ) {
    return this.potService.deletePotById(userId, potId);
  }
}
