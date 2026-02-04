import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { Product } from './product.entity';
import { productsConfig } from '../config/products.config';

@Injectable()
export class ProductsService {
  private products: Product[];

  constructor() {
    // Initialize from config
    this.products = productsConfig.products.map(
      (p) => new Product(p.code, p.name, p.price)
    );
  }

  findAll(): ProductResponseDto[] {
    return this.products.map(product => ({
      code: product.code,
      name: product.name,
      price: product.price,
      packaging: productsConfig.packaging[product.code] || [],
    }));
  }

  findOne(code: string): ProductResponseDto {
    const product = this.products.find((p) => p.code === code);
    if (!product) {
      throw new NotFoundException(`Product with code '${code}' not found`);
    }
    return {
      code: product.code,
      name: product.name,
      price: product.price,
      packaging: productsConfig.packaging[product.code] || [],
    };
  }

  create(createProductDto: CreateProductDto): Product {
    const exists = this.products.some((p) => p.code === createProductDto.code);
    if (exists) {
      throw new ConflictException(`Product with code '${createProductDto.code}' already exists`);
    }

    const product = new Product(
      createProductDto.code,
      createProductDto.name,
      createProductDto.price
    );

    this.products.push(product);
    return product;
  }

  update(code: string, updateProductDto: UpdateProductDto): Product {
    const productIndex = this.products.findIndex((p) => p.code === code);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with code '${code}' not found`);
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
    };

    return this.products[productIndex];
  }

  remove(code: string): void {
    const productIndex = this.products.findIndex((p) => p.code === code);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with code '${code}' not found`);
    }

    this.products.splice(productIndex, 1);
  }
}