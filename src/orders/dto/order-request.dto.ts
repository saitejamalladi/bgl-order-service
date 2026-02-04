import { IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItemDto } from './order-item.dto';

export class OrderRequestDto {
  @ApiProperty({
    type: [OrderItemDto],
    description: 'List of products and quantities to order',
    example: [
      { productCode: 'CE', quantity: 10 },
      { productCode: 'HM', quantity: 14 },
    ]
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
}