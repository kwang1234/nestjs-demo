import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cat.service';
import { ConfigService } from './../common/config/config.service';
import { AuthModule } from './../common/auth/auth.module';
import { AuthService } from './../common/auth/auth.service';
@Module({
  imports: [AuthModule],
  controllers: [CatsController],
  providers: [CatsService, ConfigService, AuthService],
  exports: [CatsService],
})
export class CatsModule {}
