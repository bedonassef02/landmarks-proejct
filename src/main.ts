import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Landmarks APP API')
    .setDescription('This API for our graduation project (Landmarks)')
    .setVersion('1.0')
    .addServer('http://localhost:3000/api/v1/', 'Local environment')
    .addServer('https://landmarks-proejct.onrender.com/api/v1/', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.setGlobalPrefix('/api');
  app.enableVersioning();
  app.enableCors();
  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const port: number = parseInt(process.env.APP_PORT, 10) || 3000;

  await app.listen(port);
}

bootstrap();
