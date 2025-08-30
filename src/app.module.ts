import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from 'src/app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { ConfigifyModule } from '@itgorillaz/configify';

@Module({
  imports: [ConfigifyModule.forRootAsync(), AuthModule],
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
