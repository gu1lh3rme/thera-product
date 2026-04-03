import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
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
    findOne(id: number): Promise<{
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
