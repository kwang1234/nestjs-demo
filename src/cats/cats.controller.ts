import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Header,
  Param,
  Body,
  Query,
  UseInterceptors,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cat.service';
import { ConfigService } from './../common/config/config.service';
import { Logger } from 'winston';
import { AuthService } from './../common/auth/auth.service';
import { AuthPayloadDto } from './../common/auth/dto/auth.payload.dto';

@Controller('Cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  @Get()
  async findAll(@Query() query: any) {
    this.logger.log('info', 'find all cats');
    return { name: 'sb', env: this.configService.get('cats.name') };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createCat(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return this.catsService.findAll();
  }

  @Post()
  createCall(@Body() createCatDto: CreateCatDto): string {
    return createCatDto.name;
  }

  @Post('ab*d')
  @HttpCode(204)
  @Header('Cache-control', 'none')
  getCat(@Req() req: Request) {
    const cat = req.body;
    return cat.name;
  }

  @Get(':id')
  findOne(@Param() params): string {
    return `this action return a ${params.id}`;
  }
}
