import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findById(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }

  async updateStock(id: number, quantity: number) {
    return this.prisma.product.update({
      where: { id },
      data: { stockQuantity: quantity },
    });
  }
}
