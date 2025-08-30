import { Controller, Get, Request } from '@nestjs/common';
import { BetterAuthService } from './better-auth.service';
import { fromNodeHeaders } from 'better-auth/node';
import { Public, Session } from 'src/auth/auth.decorator';
import type { UserSession } from 'src/auth/auth.guard';
import type { Request as ExpressRequest } from 'express';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly betterAuthService: BetterAuthService) {}

  @Public()
  @ApiOperation({
    operationId: 'get_current_user',
  })
  @Get('/user')
  user(@Session() session: UserSession) {
    return session?.user;
  }

  @Public()
  @Get('/session')
  @ApiOperation({
    operationId: 'get_current_session',
  })
  session(@Session() session: UserSession) {
    return session;
  }

  @Get('/sessions')
  @ApiOperation({
    operationId: 'get_all_sessions',
  })
  sessions(@Request() req: ExpressRequest) {
    return this.betterAuthService.client.api.listSessions({
      headers: fromNodeHeaders(req.headers),
    });
  }
}
