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
    description: 'Calculates the optimal packaging breakdown to minimize the number of packages for the given order.'
  })
  @ApiResponse({
    status: 200,
    description: 'Order calculated successfully',
    type: OrderResponseDto
  })
  @ApiResponse({ status: 400, description: 'Invalid request (quantity <= 0)' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  calculateOrder(@Body() orderDto: OrderRequestDto): OrderResponseDto {
    return this.ordersService.calculateOrder(orderDto);
  }
}