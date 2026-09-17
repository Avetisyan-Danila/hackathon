import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ArcjetInfraModule } from './lib/arcjet/arcjet.module.js';
import { PrismaModule } from './lib/database/prisma.module.js';

@Module({
  imports: [ArcjetInfraModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
