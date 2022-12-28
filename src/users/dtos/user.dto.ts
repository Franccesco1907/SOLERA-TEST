import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly fullname: string;

  @IsString()
  @IsNotEmpty()
  readonly createdAt: string;

  @IsString()
  @IsNotEmpty()
  readonly updatedAt: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}