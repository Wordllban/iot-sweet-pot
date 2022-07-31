import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTemperatureDto, EditTemperatureDto } from "./dto";

@Injectable()
export class TemperatureService {
  constructor(private prisma: PrismaService) {}

  async createTemperature(potId: number, dto: CreateTemperatureDto) {
    const { value, name, description, model } = dto;
    const temperatureSensor = await this.prisma.temperature.create({
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
        temperature: {
          connect: {
            id: temperatureSensor.id,
          },
        },
      },
    });

    return temperatureSensor;
  }

  getAllTemperature(potId: number) {
    return this.prisma.temperature.findMany({
      where: {
        potId,
      },
    });
  }

  async getTemperatureById(id: number) {
    const temperature = await this.prisma.temperature.findUnique({
      where: { id },
    });

    if (!temperature)
      throw new ForbiddenException(`Temperature sensor with ${id} not found.`);

    return temperature;
  }

  async editTemperature(
    id: number,
    ownerId: number,
    potId: number,
    dto: EditTemperatureDto,
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

    return this.prisma.temperature.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async deleteTemperatureById(ownerId: number, potId: number, id: number) {
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

    return this.prisma.temperature.delete({
      where: {
        id,
      },
    });
  }
}
