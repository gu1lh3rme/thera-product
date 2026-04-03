import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { ProductsRepository } from '../products/products.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockOrdersRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  const mockProductsRepository = {
    findById: jest.fn(),
    updateStock: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrdersRepository, useValue: mockOrdersRepository },
        { provide: ProductsRepository, useValue: mockProductsRepository },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw BadRequestException when stock is insufficient', async () => {
      mockProductsRepository.findById.mockResolvedValue({
        id: 1, name: 'P', price: 10, stockQuantity: 2,
      });

      await expect(
        service.create({ items: [{ productId: 1, quantity: 5 }], status: 'Pendente' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create order and update stock when status is Concluido', async () => {
      mockProductsRepository.findById.mockResolvedValue({
        id: 1, name: 'P', price: 10, stockQuantity: 10,
      });
      const order = { id: 1, totalPrice: 30, status: 'Concluido', items: [] };
      mockOrdersRepository.create.mockResolvedValue(order);
      mockProductsRepository.updateStock.mockResolvedValue({});

      const result = await service.create({ items: [{ productId: 1, quantity: 3 }], status: 'Concluido' });
      expect(result).toEqual(order);
      expect(mockProductsRepository.updateStock).toHaveBeenCalledWith(1, 7);
    });

    it('should throw NotFoundException when product does not exist', async () => {
      mockProductsRepository.findById.mockResolvedValue(null);
      await expect(
        service.create({ items: [{ productId: 999, quantity: 1 }] }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
