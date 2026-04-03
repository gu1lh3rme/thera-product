"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const orders_repository_1 = require("./orders.repository");
const products_repository_1 = require("../products/products.repository");
let OrdersService = class OrdersService {
    ordersRepository;
    productsRepository;
    constructor(ordersRepository, productsRepository) {
        this.ordersRepository = ordersRepository;
        this.productsRepository = productsRepository;
    }
    async create(createOrderDto) {
        const { items, status = 'Pendente' } = createOrderDto;
        const orderItems = [];
        let totalPrice = 0;
        const productCache = new Map();
        for (const item of items) {
            const product = await this.productsRepository.findById(item.productId);
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${item.productId} not found`);
            }
            if (product.stockQuantity < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for product "${product.name}". Available: ${product.stockQuantity}, Requested: ${item.quantity}`);
            }
            const price = Number(product.price);
            orderItems.push({ productId: item.productId, quantity: item.quantity, price });
            totalPrice += price * item.quantity;
            productCache.set(item.productId, product);
        }
        const order = await this.ordersRepository.create({
            items: orderItems,
            totalPrice,
            status: status,
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
    async findById(id) {
        const order = await this.ordersRepository.findById(id);
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        products_repository_1.ProductsRepository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map