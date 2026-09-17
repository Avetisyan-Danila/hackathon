import { Controller, Get } from '@nestjs/common';
import {
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import type { Auth } from '../../lib/auth/create-auth.js';

@Controller('users')
export class UserController {
  @Get('me')
  getProfile(@Session() session: UserSession<Auth>) {
    return { user: session.user };
  }
}
