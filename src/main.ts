import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.setGlobalPrefix('/api');
  app.enableVersioning();
  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const port: number = parseInt(process.env.APP_PORT, 10) || 3000;

  await app.listen(port);
}

bootstrap();
