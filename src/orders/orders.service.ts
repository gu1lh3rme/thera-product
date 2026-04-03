import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ProductsRepository } from '../products/products.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, status = 'Pendente' } = createOrderDto;

    const orderItems: { productId: number; quantity: number; price: number }[] = [];
    let totalPrice = 0;
    const productCache = new Map<number, Awaited<ReturnType<ProductsRepository['findById']>>>();

    for (const item of items) {
      const product = await this.productsRepository.findById(item.productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }
      if (product.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product "${product.name}". Available: ${product.stockQuantity}, Requested: ${item.quantity}`,
        );
      }
      const price = Number(product.price);
      orderItems.push({ productId: item.productId, quantity: item.quantity, price });
      totalPrice += price * item.quantity;
      productCache.set(item.productId, product);
    }

    const order = await this.ordersRepository.create({
      items: orderItems,
      totalPrice,
      status: status as OrderStatus,
    });

    if (status === 'Concluido') {
      for (const item of items) {
        const product = productCache.get(item.productId);
        if (product) {
          await this.productsRepository.updateStock(item.productId, product.stockQuantity - item.quantity);
        }
      }
    }

    return order;
  }

  async findAll() {
    return this.ordersRepository.findAll();
  }

  async findById(id: number) {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
}
