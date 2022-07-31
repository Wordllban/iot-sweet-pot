import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateMoistureDto, EditMoistureDto } from "./dto";

@Injectable()
export class MoistureService {
  constructor(private prisma: PrismaService) {}
 
  async createMoisture(potId: number, dto: CreateMoistureDto) {
    const { value, name, description, model } = dto;
    const moistureSensor = await this.prisma.moisture.create({
      data: {
        value: +value,
        name,
        description,
        model,
        potId: potId,
      },
    });

    await this.prisma.pot.update({
      where: {
        id: potId,
      },
      data: {
        moisture: {
          connect: {
            id: moistureSensor.id,
          },
        },
      },
    });

    return moistureSensor;
  }

  getAllMoisture(potId: number) {
    return this.prisma.moisture.findMany({
      where: {
        potId,
      },
    });
  }

  async getMoistureById(id: number) {
    const moisture = await this.prisma.moisture.findUnique({
      where: { id },
    });

    if (!moisture)
      throw new ForbiddenException(`Moisture sensor with ${id} not found.`);

    return moisture;
  }

  async editMoisture(
    id: number,
    ownerId: number,
    potId: number,
    dto: EditMoistureDto,
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

    return this.prisma.moisture.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async deleteMoistureById(ownerId: number, potId: number, id: number) {
    // get pot by id
    const pot = await this.prisma.pot.findUnique({
      where: {
        id: potId,
      },
    });

    // check is user ows the pot
    if (!pot || pot.ownerId !== ownerId)
      throw new ForbiddenException(
        "You are not owner of this pot! Access denied",
      );

    return this.prisma.moisture.delete({
      where: {
        id,
      },
    });
  }
}
