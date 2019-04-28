import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './common/auth/auth.service';
import { AuthPayloadDto } from './common/auth/dto/auth.payload.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}
}
