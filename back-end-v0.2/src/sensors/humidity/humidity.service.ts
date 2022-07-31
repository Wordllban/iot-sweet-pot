import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateHumidityDto, EditHumidityDto } from "./dto";

@Injectable()
export class HumidityService {
  constructor(private prisma: PrismaService) {}

  async createHumidity(potId: number, dto: CreateHumidityDto) {
    const { value, name, description, model } = dto;
    const humiditySensor = await this.prisma.humidity.create({
      data: {
        value: +value,
        name,
        description,
        model,
        potId,
      },
    });

    await this.prisma.pot.update({
      where: {
        id: potId,
      },
      data: {
        humidity: {
          connect: {
            id: humiditySensor.id,
          },
        },
      },
    });

    return humiditySensor;
  }

  getAllHumidity(potId: number) {
    return this.prisma.humidity.findMany({
      where: {
        potId,
      },
    });
  }

  async getHumidityById(id: number) {
    const humidity = await this.prisma.humidity.findUnique({
      where: { id },
    });

    if (!humidity)
      throw new ForbiddenException(`Humidity sensor with ${id} not found.`);

    return humidity;
  }

  async editHumidity(
    id: number,
    ownerId: number,
    potId: number,
    dto: EditHumidityDto,
  ) {
    // get pot by id
    const pot = await this.prisma.pot.findUnique({
      where: {
        id: potId,
      },
    });

    // check if user owns the pot
    if (!pot || pot.ownerId != ownerId)
      throw new ForbiddenException(
        "You are not owner of this pot! Access denied",
      );

    return this.prisma.humidity.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async deleteHumidityById(ownerId: number, potId: number, id: number) {
    // get pot by id
    const pot = await this.prisma.pot.findUnique({
      where: {
        id: potId,
      },
    });

    // check if user owns the pot
    if (!pot || pot.ownerId !== ownerId)
      throw new ForbiddenException(
        "You are not owner of this pot! Access denied",
      );

    return this.prisma.humidity.delete({
      where: {
        id,
      },
    });
  }
}
