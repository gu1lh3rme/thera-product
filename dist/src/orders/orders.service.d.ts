import { OrdersRepository } from './orders.repository';
import { ProductsRepository } from '../products/products.repository';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private readonly ordersRepository;
    private readonly productsRepository;
    constructor(ordersRepository: OrdersRepository, productsRepository: ProductsRepository);
    create(createOrderDto: CreateOrderDto): Promise<{
        items: ({
            product: {
                name: string;
                category: string;
                description: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                stockQuantity: number;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
        } & {
            price: import("@prisma/client-runtime-utils").Decimal;
            id: number;
            quantity: number;
            productId: number;
            orderId: number;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
    findAll(): Promise<({
        items: ({
            product: {
                name: string;
                category: string;
                description: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                stockQuantity: number;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
        } & {
            price: import("@prisma/client-runtime-utils").Decimal;
            id: number;
            quantity: number;
            productId: number;
            orderId: number;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
    })[]>;
    findById(id: number): Promise<{
        items: ({
            product: {
                name: string;
                category: string;
                description: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                stockQuantity: number;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
        } & {
            price: import("@prisma/client-runtime-utils").Decimal;
            id: number;
            quantity: number;
            productId: number;
            orderId: number;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
}
