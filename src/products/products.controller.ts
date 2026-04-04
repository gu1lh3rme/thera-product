import {
  Controller, Get, Post, Put, Delete,
  Body, Param, ParseIntPipe, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { 
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, 
  ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse,
  ApiNotFoundResponse, ApiBadRequestResponse, ApiBody
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ description: 'Product successfully created' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products', description: 'Retrieve a list of all products in the system' })
  @ApiOkResponse({ description: 'List of products retrieved successfully' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID', description: 'Retrieve a specific product by its ID' })
  @ApiOkResponse({ description: 'Product found and returned successfully' })
  @ApiNotFoundResponse({ description: 'Product with the specified ID not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product', description: 'Update an existing product with new data' })
  @ApiOkResponse({ description: 'Product updated successfully' })
  @ApiNotFoundResponse({ description: 'Product with the specified ID not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product', description: 'Remove a product from the system' })
  @ApiNoContentResponse({ description: 'Product deleted successfully' })
  @ApiNotFoundResponse({ description: 'Product with the specified ID not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
