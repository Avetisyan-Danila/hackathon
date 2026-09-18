import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../lib/database/prisma.service.js';
import type { CreateHackathonDto } from './dto/create-hackathon.dto.js';
import type { UpdateHackathonDto } from './dto/update-hackathon.dto.js';

@Injectable()
export class HackathonService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.hackathon.findMany();
  }

  async findById(id: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id },
    });
    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }
    return hackathon;
  }

  create(authorId: string, dto: CreateHackathonDto) {
    return this.prisma.hackathon.create({
      data: {
        name: dto.name,
        description: dto.description,
        startDate: dto.startsAt,
        endDate: dto.endsAt,
        isActive: dto.isActive,
        authorId,
      },
    });
  }

  async update(id: string, dto: UpdateHackathonDto) {
    await this.findById(id);
    return this.prisma.hackathon.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        startDate: dto.startsAt,
        endDate: dto.endsAt,
        isActive: dto.isActive,
      },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.hackathon.delete({ where: { id } });
  }

  async join(hackathonId: string, userId: string) {
    const hackathon = await this.findById(hackathonId);

    if (!hackathon.isActive) {
      throw new BadRequestException('Hackathon is not active');
    }

    if (hackathon.endDate <= new Date()) {
      throw new BadRequestException('Hackathon has already ended');
    }

    try {
      return await this.prisma.hackathonParticipant.create({
        data: { hackathonId, userId },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('Already joined this hackathon');
      }
      throw error;
    }
  }
}
