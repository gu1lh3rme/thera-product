import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: jest.Mocked<ProductsRepository>;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    updateStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get(ProductsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a product when found', async () => {
      const product = { id: 1, name: 'Test', category: 'Cat', description: 'Desc', price: 10, stockQuantity: 5 };
      mockRepository.findById.mockResolvedValue(product);
      const result = await service.findById(1);
      expect(result).toEqual(product);
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when product not found', async () => {
      mockRepository.findById.mockResolvedValue(null);
      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const dto = { name: 'P', category: 'C', description: 'D', price: 10, stockQuantity: 5 };
      const created = { id: 1, ...dto };
      mockRepository.create.mockResolvedValue(created);
      const result = await service.create(dto);
      expect(result).toEqual(created);
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
    });
  });
});
