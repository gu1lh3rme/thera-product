import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateProductDto): Promise<{
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
    } | null>;
    update(id: number, data: UpdateProductDto): Promise<{
        name: string;
        category: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    delete(id: number): Promise<{
        name: string;
        category: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    updateStock(id: number, quantity: number): Promise<{
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
