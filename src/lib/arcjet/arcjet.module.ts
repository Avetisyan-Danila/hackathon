import { ArcjetGuard, ArcjetModule, shield, slidingWindow } from '@arcjet/nest';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ArcjetLogger } from './arcjet.logger.js';
import { ArcjetService } from './arcjet.service.js';
import 'dotenv/config';

function arcjetMode(value: string | undefined): 'LIVE' | 'DRY_RUN' {
  return value === 'LIVE' ? 'LIVE' : 'DRY_RUN';
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate(config: Record<string, unknown>) {
        if (typeof config.ARCJET_KEY !== 'string') {
          throw new Error(
            'ARCJET_KEY must be set. Create a site with the Arcjet MCP tools.',
          );
        }
        return config;
      },
    }),
    ArcjetModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService, ArcjetLogger],
      provideInjectionTokensFrom: [ArcjetLogger],
      useFactory: (config: ConfigService, log: ArcjetLogger) => {
        const mode = arcjetMode(config.get<string>('ARCJET_MODE'));
        return {
          key: config.getOrThrow<string>('ARCJET_KEY'),
          log,
          rules: [
            shield({ mode }),
            slidingWindow({
              mode,
              max: 10,
              interval: '60s',
            }),
          ],
        };
      },
    }),
  ],
  providers: [
    ArcjetLogger,
    ArcjetService,
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
  exports: [ArcjetService],
})
export class ArcjetInfraModule {}
