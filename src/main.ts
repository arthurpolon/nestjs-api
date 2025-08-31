import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { cleanupOpenApiDoc } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Disable body parser beacause of better-auth
    // Re-enable in AuthModule.configure
    bodyParser: false,
  });
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Docs API')
    .setDescription('The docs API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    cleanupOpenApiDoc(SwaggerModule.createDocument(app, config));
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.PORT ?? 3000, () => {
    const logger = new Logger('Application');

    logger.log(
      `App is running at http://localhost:${process.env.PORT ?? 3000}`,
    );

    logger.log(
      `API Swagger is available on http://localhost:${process.env.PORT ?? 3000}/swagger`,
    );
    logger.log(
      `Better-Auth Swagger is available on http://localhost:${process.env.PORT ?? 3000}/api/better-auth/reference`,
    );
  });
}
void bootstrap();
