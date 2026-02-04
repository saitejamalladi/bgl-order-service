import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('should return all products', () => {
      const result = service.findAll();
      expect(result).toHaveLength(3);
      expect(result[0].code).toBe('CE');
    });
  });

  describe('findOne', () => {
    it('should return product by code', () => {
      const result = service.findOne('CE');
      expect(result.code).toBe('CE');
      expect(result.name).toBe('Cheese');
    });

    it('should throw NotFoundException for invalid code', () => {
      expect(() => service.findOne('INVALID')).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should add new product', () => {
      const createDto: CreateProductDto = {
        code: 'NEW',
        name: 'New Product',
        price: 10.00,
      };

      const result = service.create(createDto);
      expect(result.code).toBe('NEW');
      expect(service.findAll()).toHaveLength(4);
    });

    it('should throw ConflictException for duplicate code', () => {
      const createDto: CreateProductDto = {
        code: 'CE',
        name: 'Duplicate',
        price: 10.00,
      };

      expect(() => service.create(createDto)).toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update existing product', () => {
      const updateDto: UpdateProductDto = {
        name: 'Updated Cheese',
        price: 6.95,
      };

      const result = service.update('CE', updateDto);
      expect(result.name).toBe('Updated Cheese');
      expect(result.price).toBe(6.95);
    });

    it('should throw NotFoundException for invalid code', () => {
      const updateDto: UpdateProductDto = { name: 'Test' };
      expect(() => service.update('INVALID', updateDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete product by code', () => {
      service.remove('CE');
      expect(service.findAll()).toHaveLength(2);
      expect(() => service.findOne('CE')).toThrow(NotFoundException);
    });

    it('should throw NotFoundException for invalid code', () => {
      expect(() => service.remove('INVALID')).toThrow(NotFoundException);
    });
  });
});