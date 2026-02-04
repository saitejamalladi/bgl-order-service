import { ApiProperty } from '@nestjs/swagger';

export class PackageBreakdownDto {
  @ApiProperty({ example: 2, description: 'Number of packages of this size' })
  quantity!: number;

  @ApiProperty({ example: 5, description: 'Items per package' })
  bundleSize!: number;

  @ApiProperty({ example: 20.95, description: 'Price per package' })
  unitPrice!: number;

  @ApiProperty({ example: 41.90, description: 'Total price for these packages' })
  totalPrice!: number;
}

export class ProductOrderResultDto {
  @ApiProperty({ example: 'CE', description: 'Product code' })
  productCode!: string;

  @ApiProperty({ example: 'Cheese', description: 'Product name' })
  productName!: string;

  @ApiProperty({ example: 10, description: 'Quantity ordered' })
  orderedQuantity!: number;

  @ApiProperty({ example: 41.90, description: 'Total cost for this product' })
  totalCost!: number;

  @ApiProperty({ type: [PackageBreakdownDto] })
  breakdown!: PackageBreakdownDto[];
}

export class OrderResponseDto {
  @ApiProperty({ type: [ProductOrderResultDto] })
  items!: ProductOrderResultDto[];

  @ApiProperty({ example: 156.60, description: 'Grand total for entire order' })
  grandTotal!: number;
}