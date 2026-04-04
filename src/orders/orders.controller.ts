import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { 
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse,
  ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse,
  ApiBadRequestResponse, ApiBody
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new order', 
    description: `Create a new order with automatic price calculation and stock validation.
    
    **Features:**
    - ✅ Automatic price calculation from current product prices
    - ✅ Stock availability validation  
    - ✅ Automatic stock update when status = "Concluido"
    - ✅ Supports multiple products in single order
    
    **Important:** Do not include price in the request body - it's calculated automatically!`
  })
  @ApiCreatedResponse({ 
    description: 'Order successfully created with calculated total price',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        totalPrice: { type: 'number', example: 2649.98 },
        status: { type: 'string', example: 'Pendente' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'number', example: 1 },
              quantity: { type: 'number', example: 2 },
              price: { type: 'number', example: 1299.99 }
            }
          }
        }
      }
    }
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid input data or insufficient stock',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Insufficient stock for product "iPhone 15 Pro". Available: 10, Requested: 15' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  @ApiBody({ type: CreateOrderDto })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders', description: 'Retrieve a list of all orders with their items' })
  @ApiOkResponse({ description: 'List of orders retrieved successfully' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID', description: 'Retrieve a specific order with its items and product details' })
  @ApiOkResponse({ description: 'Order found and returned successfully' })
  @ApiNotFoundResponse({ description: 'Order with the specified ID not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findById(id);
  }
}
