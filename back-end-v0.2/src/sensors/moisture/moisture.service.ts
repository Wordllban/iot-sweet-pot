import { Injectable } from "@nestjs/common";
import { CreateMoistureDto } from "./dto";

@Injectable()
export class MoistureService {
  create(createMoistureDto: CreateMoistureDto) {
    return "This action adds a new moisture";
  }

  findAll() {
    return `This action returns all moisture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moisture`;
  }

  remove(id: number) {
    return `This action removes a #${id} moisture`;
  }
}
