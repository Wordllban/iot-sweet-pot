import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePotDto } from "./dto/create-pot.dto";
import { EditPotDto } from "./dto/edit-pot.dto";

@Injectable()
export class PotService {
  constructor(private prisma: PrismaService) {}
  async createPot(ownerId: number, dto: CreatePotDto) {
    const pot = await this.prisma.pot.create({
      data: {
        ownerId,
        ...dto,
      },
    });
    return pot;
  }

  getPots(ownerId: number) {
    return this.prisma.pot.findMany({
      where: {
        ownerId,
      },
      include: {
        humidity: true,
        temperature: true,
        moisture: true,
      },
    });
  }

  getPotById(ownerId: number, potId: number) {
    return this.prisma.pot.findFirst({
      where: {
        id: potId,
        ownerId,
      },
    });
  }

  async editPot(ownerId: number, potId: number, dto: EditPotDto) {
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

    const { name, description, temperature, humidity, moisture } = dto;

    return this.prisma.pot.update({
      where: {
        id: potId,
      },
      data: {
        name,
        description,
        temperature: {
          update: {
            where: {
              id: potId,
            },
            data: {
              ...temperature,
            },
          },
        },
        humidity: {
          update: {
            where: {
              id: potId,
            },
            data: {
              ...humidity,
            },
          },
        },
        moisture: {
          update: {
            where: {
              id: potId,
            },
            data: {
              ...moisture,
            },
          },
        },
      },
    });
  }

  async deletePotById(ownerId: number, potId: number) {
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

    return await this.prisma.pot.delete({
      where: {
        id: potId,
      },
    });
  }
}
