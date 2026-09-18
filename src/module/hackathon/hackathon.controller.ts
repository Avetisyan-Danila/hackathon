import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  AuthGuard,
  Roles,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import type { Auth } from '../../lib/auth/create-auth.js';
import { ResponseMessage } from '../../common/decorators/response-message.decorator.js';
import { CreateHackathonDto } from './dto/create-hackathon.dto.js';
import { UpdateHackathonDto } from './dto/update-hackathon.dto.js';
import { HackathonService } from './hackathon.service.js';

@Controller('hackathon')
@UseGuards(AuthGuard)
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @Get()
  @ResponseMessage('Hackathons fetched successfully')
  findAll() {
    return this.hackathonService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Hackathon fetched successfully')
  findById(@Param('id') id: string) {
    return this.hackathonService.findById(id);
  }

  @Post(':id/join')
  @Roles(['PARTICIPANT'])
  @ResponseMessage('Joined hackathon successfully')
  join(
    @Param('id') id: string,
    @Session() session: UserSession<Auth>,
  ) {
    return this.hackathonService.join(id, session.user.id);
  }

  @Post()
  @Roles(['ADMIN'])
  @ResponseMessage('Hackathon created successfully')
  create(
    @Session() session: UserSession<Auth>,
    @Body() dto: CreateHackathonDto,
  ) {
    return this.hackathonService.create(session.user.id, dto);
  }

  @Patch(':id')
  @Roles(['ADMIN'])
  @ResponseMessage('Hackathon updated successfully')
  update(@Param('id') id: string, @Body() dto: UpdateHackathonDto) {
    return this.hackathonService.update(id, dto);
  }

  @Delete(':id')
  @Roles(['ADMIN'])
  @ResponseMessage('Hackathon deleted successfully')
  remove(@Param('id') id: string) {
    return this.hackathonService.remove(id);
  }
}
