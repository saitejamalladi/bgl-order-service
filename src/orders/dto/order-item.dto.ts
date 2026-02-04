import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ example: 'CE', description: 'Product code' })
  @IsString()
  @IsNotEmpty()
  productCode!: string;

  @ApiProperty({ example: 10, description: 'Quantity to order' })
  @IsNumber()
  @Min(1)
  quantity!: number;
}