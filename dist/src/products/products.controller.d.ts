import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
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
    findOne(id: number): Promise<{
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
