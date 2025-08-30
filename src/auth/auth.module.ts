import { Logger, Module, NestModule } from '@nestjs/common';
import { BetterAuthService } from './better-auth.service';
import { AuthController } from './auth.controller';
import { HttpAdapterHost } from '@nestjs/core';
import { toNodeHandler } from 'better-auth/node';
import { ConfigModule } from '@nestjs/config';
import { DatabasesModule } from 'src/database/database.module';
import { BETTER_AUTH_BASE_PATH, TRUSTED_ORIGINS } from 'src/auth/constants';
import type { Express } from 'express';
import { json as jsonParser } from 'express';

@Module({
  imports: [ConfigModule, DatabasesModule],
  providers: [BetterAuthService],
  controllers: [AuthController],
  exports: [BetterAuthService],
})
export class AuthModule implements NestModule {
  private readonly logger = new Logger(AuthModule.name);
  constructor(
    private readonly adapter: HttpAdapterHost,
    private readonly betterAuthService: BetterAuthService,
  ) {}

  configure(): void {
    this.adapter.httpAdapter.enableCors({
      origin: TRUSTED_ORIGINS,
      methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
      ],
      credentials: true,
    });

    const handler = toNodeHandler(this.betterAuthService.client);
    const instance: Express = this.adapter.httpAdapter.getInstance();

    instance.use(`${BETTER_AUTH_BASE_PATH}/*path`, (req, res) => {
      return handler(req, res);
    });

    instance.use(jsonParser());

    this.logger.log(
      `AuthModule initialized BetterAuth on '${BETTER_AUTH_BASE_PATH}/*'`,
    );
  }
}
