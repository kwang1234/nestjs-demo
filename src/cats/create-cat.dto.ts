import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @IsString()
  @ApiModelProperty()
  name: string;

  @IsInt()
  @ApiModelProperty()
  age: number;

  @IsString()
  @ApiModelProperty()
  bread: string;
}
