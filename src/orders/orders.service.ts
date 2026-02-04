import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { OrderRequestDto } from './dto/order-request.dto';
import { OrderResponseDto, ProductOrderResultDto, PackageBreakdownDto } from './dto/order-response.dto';
import { productsConfig, PackagingOption } from '../config/products.config';

@Injectable()
export class OrdersService {
  constructor(private readonly productsService: ProductsService) {}

  calculateOrder(orderDto: OrderRequestDto): OrderResponseDto {
    const results: ProductOrderResultDto[] = [];

    for (const item of orderDto.items) {
      if (item.quantity <= 0) {
        throw new BadRequestException(`Quantity must be positive for product ${item.productCode}`);
      }

      // Validate product exists
      const product = this.productsService.findOne(item.productCode);

      // Calculate breakdown for this product
      const breakdown = this.calculateProductBreakdown(item.productCode, item.quantity, product.price);

      results.push({
        productCode: item.productCode,
        productName: product.name,
        orderedQuantity: item.quantity,
        totalCost: this.roundTo2Decimal(breakdown.reduce((sum, b) => sum + b.totalPrice, 0)),
        breakdown,
      });
    }

    const grandTotal = this.roundTo2Decimal(
      results.reduce((sum, result) => sum + result.totalCost, 0)
    );

    return {
      items: results,
      grandTotal,
    };
  }

  private calculateProductBreakdown(productCode: string, quantity: number, unitPrice: number): PackageBreakdownDto[] {
    const packagingOptions = productsConfig.packaging[productCode] || [];

    // Sort packaging options by bundle size (descending) for greedy algorithm
    const sortedPackaging = [...packagingOptions].sort((a, b) => b.quantity - a.quantity);

    const breakdown: PackageBreakdownDto[] = [];
    let remainingQuantity = quantity;

    // Greedy algorithm: use largest bundles first
    for (const option of sortedPackaging) {
      if (remainingQuantity >= option.quantity) {
        const packagesNeeded = Math.floor(remainingQuantity / option.quantity);

        breakdown.push({
          quantity: packagesNeeded,
          bundleSize: option.quantity,
          unitPrice: option.price,
          totalPrice: this.roundTo2Decimal(packagesNeeded * option.price),
        });

        remainingQuantity -= packagesNeeded * option.quantity;
      }
    }

    // Handle remainder with unit pricing
    if (remainingQuantity > 0) {
      breakdown.push({
        quantity: remainingQuantity,
        bundleSize: 1,
        unitPrice: unitPrice,
        totalPrice: this.roundTo2Decimal(remainingQuantity * unitPrice),
      });
    }

    return breakdown;
  }

  private roundTo2Decimal(value: number): number {
    return Math.round(value * 100) / 100;
  }
}