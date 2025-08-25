import { Controller, Get } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/auth/dto/user.dto';

@Controller('auth')
export class AuthController {
  @ApiOperation({
    operationId: 'get_whoAmI',
    summary: 'Get current user information',
  })
  @ApiResponse({
    status: 200,
    description: 'User information retrieved successfully',
    type: User,
  })
  @Get('whoami')
  whoAmI(@Session() session: UserSession): User {
    return session.user;
  }
}
