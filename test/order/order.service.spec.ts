import { Test, TestingModule } from '@nestjs/testing';
import { IOrderService, OrderService } from '../../src/modules/order/service';
import { IOrderRepository } from '../../src/modules/order/repository';
import { IStockService, StockService } from '../../src/modules/stock/service';
import { NewOrderInput } from '../../src/modules/order/input/order.input';
import { OrderRepository } from '../../src/modules/order/repository/order.repository';
import { PrismaService } from '../../src/prisma';
import { PickerService } from '../../src/modules/picker/service/picker.service';
import { ConfigService } from '@nestjs/config';
import { IProductService, ProductService } from '../../src/modules/product/service';
import { IProductRepository, ProductRepository } from '../../src/modules/product/repository';

describe('EventService Unit Test', () => {
    let orderService: IOrderService;
    let stockService: IStockService;

    beforeEach(async () => {
        const orderServiceProvider = {
            provide: IOrderService,
            useClass: OrderService,
        };
        const orderRepositoryProvider = {
            provide: IOrderRepository,
            useClass: OrderRepository,
        };
        const stockServiceProvider = {
            provide: IStockService,
            useClass: StockService,
        };
        const productServiceProvider = {
            provide: IProductService,
            useClass: ProductService,
        };
        const productRepositoryProvider = {
            provide: IProductRepository,
            useClass: ProductRepository,
        };

        const app: TestingModule = await Test.createTestingModule({
            providers: [
                PrismaService,
                ConfigService,
                orderServiceProvider,
                orderRepositoryProvider,
                PickerService,
                productServiceProvider,
                productRepositoryProvider,
                stockServiceProvider,
            ],
        }).compile();

        orderService = app.get<IOrderService>(IOrderService);
        stockService = app.get<IStockService>(IStockService);
    });

    it('create order', async () => {
        const input = new NewOrderInput();
        input.status = 'NOT_STARTED';
        input.totalAmount = 150;
        input.address = 'CABA';
        input.products = [
            {
                productId: 4,
                quantity: 1,
            },
        ];

        await orderService.createOrder(input);
        const result = await orderService.getAllOrders();

        expect(result.length).toBeGreaterThanOrEqual(2);
        const lastTwoOrders = result.slice(-2);

        lastTwoOrders.forEach(order => {
            expect(order).toHaveProperty('id');
            expect(typeof order.id).toBe('number');
            expect(order).toHaveProperty('createdAt');
            expect(order.createdAt).toBeInstanceOf(Date);
            expect(order.status).toBe('NOT_STARTED');
            expect(order.totalAmount).toBe(150);
            expect(order.address).toBe('CABA');
        });
    });

    it('get all orders ready to ship', async () => {
        const result = await orderService.getAllReadyToShip();

        result.forEach(order => {
            expect(order.status).toBe('READY_TO_SHIP');
        });
    });

    it('get all delivered orders', async () => {
        const result = await orderService.getAllDelivered();

        result.forEach(order => {
            expect(order.status).toBe('DELIVERED');
        });
    });

    it('get all orders in shipping', async () => {
        const result = await orderService.getAllShipping();

        result.forEach(order => {
            expect(order.status).toBe('SHIPPING');
        });
    });

    it('get all items in stock', async () => {
        const result = await stockService.getAllItemsInStock();

        result.forEach(item => {
            expect(item).toHaveProperty('itemName');
            expect(typeof item.itemName).toBe('string');
            expect(item).toHaveProperty('quantity');
            expect(typeof item.quantity).toBe('number');
            expect(item).toHaveProperty('productId');
            expect(typeof item.productId).toBe('number');
        });
    });

    it('create order with invalid input', async () => {
        const input = new NewOrderInput();
        input.totalAmount = -150; // Invalid total amount
        input.address = 'CABA';
        input.products = []; // No products

        await expect(orderService.createOrder(input)).rejects.toThrow();
    });

    it('get order by id', async () => {
    const input = new NewOrderInput();
    input.status = 'NOT_STARTED';
    input.totalAmount = 150;
    input.address = 'CABA';
    input.products = [
        {
            productId: 4,
            quantity: 1,
        },
    ];

    const createdOrder = await orderService.createOrder(input);
    const fetchedOrder = await orderService.getById(createdOrder.id);

    const expectedOrder = {
        ...createdOrder,
        products: [
            {
                orderId: createdOrder.id,
                productId: 4,
                quantity: 1,
            },
        ],
    };

    expect(fetchedOrder).toEqual(expectedOrder);
});

    it('get order by invalid id', async () => {
        const invalidId = 9999; // This ID should not exist in the database

        await expect(orderService.getById(invalidId)).rejects.toThrow();
    });

});
