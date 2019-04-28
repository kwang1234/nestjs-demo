import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TerminusModule } from '@nestjs/terminus';
import { AppService } from './app.service';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './common/auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    CatsModule,
    AuthModule,
    TerminusModule.forRootAsync({
      useClass: AppService,
    }),
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    }),
  ],
})
export class AppModule {}
