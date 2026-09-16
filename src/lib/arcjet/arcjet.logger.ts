import { Injectable, Logger, type LoggerService } from '@nestjs/common';

@Injectable()
export class ArcjetLogger implements LoggerService {
  private readonly logger = new Logger(ArcjetLogger.name);

  log(message: unknown, ...optionalParams: unknown[]) {
    this.logger.log(message as string, ...optionalParams);
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    this.logger.error(message as string, ...optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    this.logger.error(message as string, ...optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    this.logger.warn(message as string, ...optionalParams);
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    this.logger.debug(message as string, ...optionalParams);
  }

  info(message: unknown, ...optionalParams: unknown[]) {
    this.logger.log(message as string, ...optionalParams);
  }
}
