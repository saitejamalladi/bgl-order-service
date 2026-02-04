import { ApiProperty } from '@nestjs/swagger';

export class PackagingOptionDto {
  @ApiProperty({ 
    example: 5, 
    description: 'Number of items in this bundle' 
  })
  quantity!: number;

  @ApiProperty({ 
    example: 20.95, 
    description: 'Price per bundle in dollars' 
  })
  price!: number;
}

export class ProductResponseDto {
  @ApiProperty({ 
    example: 'CE', 
    description: 'Unique product code' 
  })
  code!: string;

  @ApiProperty({ 
    example: 'Cheese', 
    description: 'Product name' 
  })
  name!: string;

  @ApiProperty({ 
    example: 7.95, 
    description: 'Unit price per item in dollars' 
  })
  price!: number;

  @ApiProperty({ 
    type: [PackagingOptionDto],
    description: 'Available packaging options for this product' 
  })
  packaging!: PackagingOptionDto[];
}