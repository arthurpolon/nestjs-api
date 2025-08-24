import { Controller, Get } from '@nestjs/common';
import { Optional, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { ApiCookieAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiCookieAuth()
export class AuthController {
  @Optional()
  @Get('whoami')
  me(@Session() session?: UserSession) {
    return session?.user;
  }
}
