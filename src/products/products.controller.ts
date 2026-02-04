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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 409, description: 'Product code already exists' })
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of all products' })
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get a product by code' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('code') code: string): Product {
    return this.productsService.findOne(code);
  }

  @Put(':code')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(
    @Param('code') code: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Product {
    return this.productsService.update(code, updateProductDto);
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