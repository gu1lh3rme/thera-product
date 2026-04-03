import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: ProductsRepository);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        category: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        category: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findById(id: number): Promise<{
        name: string;
        category: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        category: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        category: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
