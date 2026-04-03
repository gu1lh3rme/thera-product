import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';
export declare class OrdersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        items: {
            productId: number;
            quantity: number;
            price: number;
        }[];
        totalPrice: number;
        status: OrderStatus;
    }): Promise<{
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
    findById(id: number): Promise<({
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
    }) | null>;
}
