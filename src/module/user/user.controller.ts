import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthGuard,
  Roles,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import type { Auth } from '../../lib/auth/create-auth.js';
import { ApiWrappedOkResponse } from '../../common/schema/api-response.schema.js';
import { UserResponseDto } from './schema/user.schema.js';
import { UserService } from './user.service.js';
import { ResponseMessage } from '../../common/decorators/response-message.decorator.js';

@ApiTags('user')
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Current session user' })
  getProfile(@Session() session: UserSession<Auth>) {
    return { user: session.user };
  }

  @Get('all')
  @Roles(['ADMIN'])
  @ApiOperation({ summary: 'List all users' })
  @ApiWrappedOkResponse(UserResponseDto, { isArray: true })
  @ResponseMessage('Users fetched successfully')
  findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiWrappedOkResponse(UserResponseDto)
  @ApiNotFoundResponse({ description: 'User not found' })
  findById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findById(id);
  }
}
