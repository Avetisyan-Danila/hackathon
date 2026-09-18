import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { ResponseInterceptor } from './common/interceptors/response.interceptor.js';
import { ApiResponseDto } from './common/schema/api-response.schema.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));
  const openApi = new DocumentBuilder()
    .setTitle('Hackathon')
    .setVersion('0.0.1')
    .build();
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, openApi, {
      extraModels: [ApiResponseDto],
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
