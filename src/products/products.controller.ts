import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { Product } from './product.entity';
import { productsConfig } from '../config/products.config';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 409, description: 'Product code already exists' })
  create(@Body() createProductDto: CreateProductDto): ProductResponseDto {
    const product = this.productsService.create(createProductDto);
    return {
      code: product.code,
      name: product.name,
      price: product.price,
      packaging: productsConfig.packaging[product.code] || [],
    };
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all products',
    description: 'Retrieves a list of all available products with their pricing and packaging options.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of products retrieved successfully',
    type: [ProductResponseDto] 
  })
  findAll(): ProductResponseDto[] {
    return this.productsService.findAll();
  }

  @Get(':code')
  @ApiOperation({ 
    summary: 'Get product by code',
    description: 'Retrieves detailed information for a specific product by its code.'
  })
  @ApiParam({ name: 'code', description: 'Product code (e.g., CE, HM, SS)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Product found and returned',
    type: ProductResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('code') code: string): ProductResponseDto {
    return this.productsService.findOne(code);
  }

  @Put(':code')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(
    @Param('code') code: string,
    @Body() updateProductDto: UpdateProductDto,
  ): ProductResponseDto {
    const product = this.productsService.update(code, updateProductDto);
    return {
      code: product.code,
      name: product.name,
      price: product.price,
      packaging: productsConfig.packaging[product.code] || [],
    };
  }

  @Delete(':code')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('code') code: string): void {
    return this.productsService.remove(code);
  }
}