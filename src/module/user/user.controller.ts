import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  Roles,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import type { Auth } from '../../lib/auth/create-auth.js';
import { UserService } from './user.service.js';
import { ResponseMessage } from '../../common/decorators/response-message.decorator.js';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getProfile(@Session() session: UserSession<Auth>) {
    return { user: session.user };
  }

  @Get('all')
  @Roles(['ADMIN'])
  @ResponseMessage('Users fetched successfully')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
