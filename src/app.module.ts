import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TerminusModule } from '@nestjs/terminus';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './common/auth/auth.module';
import { TerminusOptionsService } from './common/terminus-options.service';

@Module({
  imports: [
    CatsModule,
    AuthModule,
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
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
