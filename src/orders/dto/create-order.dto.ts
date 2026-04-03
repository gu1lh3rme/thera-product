import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, ValidateNested, IsInt, IsPositive, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ enum: ['Pendente', 'Concluido', 'Cancelado'], default: 'Pendente' })
  @IsOptional()
  @IsEnum(['Pendente', 'Concluido', 'Cancelado'])
  status?: 'Pendente' | 'Concluido' | 'Cancelado';
}
