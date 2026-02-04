import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'BR', description: 'Product code (2-3 letters)' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: 'Bread', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 2.95, description: 'Unit price in dollars' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  price!: number;
}