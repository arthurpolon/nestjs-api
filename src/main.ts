import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/config/validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const configService = app.get(ConfigService<Env>);
  const port = configService.get('PORT', { infer: true });

  await app.listen(port ?? 3001);
}
void bootstrap();
