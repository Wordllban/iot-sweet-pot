import { Injectable } from "@nestjs/common";
import { CreateHumidityDto } from "./dto";

@Injectable()
export class HumidityService {
  create(createHumidityDto: CreateHumidityDto) {
    return "This action adds a new humidity";
  }

  findAll() {
    return `This action returns all humidity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} humidity`;
  }

  remove(id: number) {
    return `This action removes a #${id} humidity`;
  }
}
