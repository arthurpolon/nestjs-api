import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'src/config/validator';
import { AuthGuard, AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from 'src/config/auth';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from 'src/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),

    AuthModule.forRoot(auth),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
