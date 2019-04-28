import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthPayloadDto {
  @IsString()
  @ApiModelProperty()
  readonly userName: string;

  @IsString()
  @ApiModelProperty()
  readonly password: string;
}
