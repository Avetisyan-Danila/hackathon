import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const openApi = new DocumentBuilder()
    .setTitle('Hackathon')
    .setVersion('0.0.1')
    .build();
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, openApi),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
