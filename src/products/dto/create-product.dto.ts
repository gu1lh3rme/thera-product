import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stockQuantity: number;
}
