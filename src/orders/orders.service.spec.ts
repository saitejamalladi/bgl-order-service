import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';
import { OrderRequestDto } from './dto/order-request.dto';

describe('OrdersService', () => {
  let service: OrdersService;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, ProductsService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('calculateOrder', () => {
    it('should calculate 10 CE correctly (2x5 bundles = $41.90)', () => {
      const orderDto: OrderRequestDto = {
        items: [{ productCode: 'CE', quantity: 10 }],
      };

      const result = service.calculateOrder(orderDto);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].totalCost).toBe(41.90);
      expect(result.items[0].breakdown).toEqual([
        { quantity: 2, bundleSize: 5, unitPrice: 20.95, totalPrice: 41.90 }
      ]);
      expect(result.grandTotal).toBe(41.90);
    });

    it('should calculate 14 HM correctly (1x8 + 1x5 + 1x1 = $78.85)', () => {
      const orderDto: OrderRequestDto = {
        items: [{ productCode: 'HM', quantity: 14 }],
      };

      const result = service.calculateOrder(orderDto);

      expect(result.items[0].totalCost).toBe(78.85);
      expect(result.items[0].breakdown).toEqual([
        { quantity: 1, bundleSize: 8, unitPrice: 40.95, totalPrice: 40.95 },
        { quantity: 1, bundleSize: 5, unitPrice: 29.95, totalPrice: 29.95 },
        { quantity: 1, bundleSize: 1, unitPrice: 7.95, totalPrice: 7.95 }
      ]);
    });

    it('should calculate 3 SS correctly (3x1 = $35.85)', () => {
      const orderDto: OrderRequestDto = {
        items: [{ productCode: 'SS', quantity: 3 }],
      };

      const result = service.calculateOrder(orderDto);

      expect(result.items[0].totalCost).toBe(35.85);
      expect(result.items[0].breakdown).toEqual([
        { quantity: 3, bundleSize: 1, unitPrice: 11.95, totalPrice: 35.85 }
      ]);
    });

    it('should handle mixed order (10 CE, 14 HM, 3 SS) = $156.60', () => {
      const orderDto: OrderRequestDto = {
        items: [
          { productCode: 'CE', quantity: 10 },
          { productCode: 'HM', quantity: 14 },
          { productCode: 'SS', quantity: 3 },
        ],
      };

      const result = service.calculateOrder(orderDto);

      expect(result.items).toHaveLength(3);
      expect(result.grandTotal).toBe(156.60);
    });

    it('should minimize number of packages', () => {
      const orderDto: OrderRequestDto = {
        items: [{ productCode: 'HM', quantity: 10 }],
      };

      const result = service.calculateOrder(orderDto);

      // Should prefer 1x8 + 1x2 over 2x5
      expect(result.items[0].breakdown).toEqual([
        { quantity: 1, bundleSize: 8, unitPrice: 40.95, totalPrice: 40.95 },
        { quantity: 1, bundleSize: 2, unitPrice: 13.95, totalPrice: 13.95 }
      ]);
    });

    it('should prefer larger bundles over smaller ones', () => {
      const orderDto: OrderRequestDto = {
        items: [{ productCode: 'CE', quantity: 8 }],
      };

      const result = service.calculateOrder(orderDto);

      // Should use 1x5 + 1x3, not 2x3 + 2x1
      expect(result.items[0].breakdown).toEqual([
        { quantity: 1, bundleSize: 5, unitPrice: 20.95, totalPrice: 20.95 },
        { quantity: 1, bundleSize: 3, unitPrice: 14.95, totalPrice: 14.95 }
      ]);
    });

    it('should fall back to unit price for remainder', () => {
      const orderDto: OrderRequestDto = {
        items: [{ productCode: 'HM', quantity: 1 }],
      };

      const result = service.calculateOrder(orderDto);

      expect(result.items[0].breakdown).toEqual([
        { quantity: 1, bundleSize: 1, unitPrice: 7.95, totalPrice: 7.95 }
      ]);
    });

    it('should throw NotFoundException for invalid product code', () => {
      const orderDto: OrderRequestDto = {
        items: [{ productCode: 'INVALID', quantity: 1 }],
      };

      expect(() => service.calculateOrder(orderDto)).toThrow(NotFoundException);
    });

    it('should throw BadRequestException for quantity <= 0', () => {
      const orderDto: OrderRequestDto = {
        items: [{ productCode: 'CE', quantity: 0 }],
      };

      expect(() => service.calculateOrder(orderDto)).toThrow(BadRequestException);
    });
  });
});