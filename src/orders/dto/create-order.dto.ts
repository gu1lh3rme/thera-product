import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, ValidateNested, IsInt, IsPositive, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty({ 
    description: 'Product ID to include in the order',
    example: 1,
    minimum: 1
  })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({ 
    description: 'Quantity of the product to order',
    example: 2,
    minimum: 1
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  // NOTE: Price is NOT required in the request
  // It will be calculated automatically from the product's current price in the database
}

export class CreateOrderDto {
  @ApiProperty({ 
    type: [OrderItemDto],
    description: 'Array of products and quantities to include in the order. Prices are calculated automatically from current product prices.',
    example: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ 
    enum: ['Pendente', 'Concluido', 'Cancelado'], 
    default: 'Pendente',
    description: 'Order status (optional, defaults to "Pendente")',
    example: 'Pendente'
  })
  @IsOptional()
  @IsEnum(['Pendente', 'Concluido', 'Cancelado'])
  status?: 'Pendente' | 'Concluido' | 'Cancelado';
}
