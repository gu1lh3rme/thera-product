import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ 
    description: 'Product name', 
    example: 'iPhone 15 Pro',
    minLength: 1,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'Product category', 
    example: 'Electronics',
    minLength: 1,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ 
    description: 'Detailed product description', 
    example: 'Latest iPhone with advanced camera and A17 Pro chip',
    minLength: 1,
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    description: 'Product price in USD', 
    example: 999.99,
    minimum: 0.01,
    type: 'number',
    format: 'decimal'
  })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @ApiProperty({ 
    description: 'Available stock quantity', 
    example: 50,
    minimum: 0,
    type: 'integer'
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stockQuantity: number;
}
