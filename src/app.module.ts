import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { createAuth } from './lib/auth/create-auth.js';
import { ArcjetInfraModule } from './lib/arcjet/arcjet.module.js';
import { PrismaModule } from './lib/database/prisma.module.js';
import { PrismaService } from './lib/database/prisma.service.js';
import { UserModule } from './module/user/user.module.js';
import { HackathonModule } from './module/hackathon/hackathon.module.js';

@Module({
  imports: [
    ArcjetInfraModule,
    PrismaModule,
    AuthModule.forRootAsync({
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => ({
        auth: createAuth(prisma),
      }),
    }),
    UserModule,
    HackathonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
