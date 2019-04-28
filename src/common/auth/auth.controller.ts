import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.payload.dto';
import { isEqual } from 'lodash';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  authenticate(@Body() authPayloadDto: AuthPayloadDto) {
    if (
      isEqual(authPayloadDto.userName, 'test') &&
      isEqual(authPayloadDto.password, 123)
    ) {
      return this.authService.createToken(authPayloadDto);
    }

    throw new UnauthorizedException();
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    // this route is restricted by AuthGuard
    // JWT strategy
  }
}
