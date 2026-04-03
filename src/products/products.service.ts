import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    return this.productsRepository.create(createProductDto);
  }

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findById(id: number) {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findById(id);
    return this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    await this.findById(id);
    return this.productsRepository.delete(id);
  }
}
