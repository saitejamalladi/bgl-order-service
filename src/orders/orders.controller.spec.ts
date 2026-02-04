import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, ProductsService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculateOrder', () => {
    it('should return order calculation', () => {
      const orderDto = {
        items: [{ productCode: 'CE', quantity: 5 }],
      };

      const result = controller.calculateOrder(orderDto);
      expect(result).toBeDefined();
      expect(result.items).toHaveLength(1);
    });
  });
});