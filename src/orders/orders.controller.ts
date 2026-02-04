import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrderRequestDto } from './dto/order-request.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('calculate')
  @ApiOperation({ 
    summary: 'Calculate order cost and packaging breakdown',
    description: `Calculates the optimal packaging breakdown to minimize the number of packages for the given order.
    
    **Algorithm:** Uses a greedy approach (largest bundles first) to minimize total packages.
    
    **Examples:**
    - 10 Cheese: 2x5 bundles = $41.90
    - 14 Ham: 1x8 + 1x5 + 1x1 = $78.85
    - 3 Soy Sauce: 3x1 = $35.85`
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Order calculated successfully',
    type: OrderResponseDto,
    schema: {
      example: {
        items: [
          {
            productCode: 'CE',
            productName: 'Cheese',
            orderedQuantity: 10,
            totalCost: 41.90,
            breakdown: [
              { quantity: 2, bundleSize: 5, unitPrice: 20.95, totalPrice: 41.90 }
            ]
          },
          {
            productCode: 'HM',
            productName: 'Ham',
            orderedQuantity: 14,
            totalCost: 78.85,
            breakdown: [
              { quantity: 1, bundleSize: 8, unitPrice: 40.95, totalPrice: 40.95 },
              { quantity: 1, bundleSize: 5, unitPrice: 29.95, totalPrice: 29.95 },
              { quantity: 1, bundleSize: 1, unitPrice: 7.95, totalPrice: 7.95 }
            ]
          },
          {
            productCode: 'SS',
            productName: 'Soy Sauce',
            orderedQuantity: 3,
            totalCost: 35.85,
            breakdown: [
              { quantity: 3, bundleSize: 1, unitPrice: 11.95, totalPrice: 35.85 }
            ]
          }
        ],
        grandTotal: 156.60
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid request (quantity <= 0)' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  calculateOrder(@Body() orderDto: OrderRequestDto): OrderResponseDto {
    return this.ordersService.calculateOrder(orderDto);
  }
}