import {Test, TestingModule} from '@nestjs/testing';
import {IOrderService, OrderService} from '../../src/modules/order/service';
import {IOrderRepository} from '../../src/modules/order/repository';
import {IStockService} from '../../src/modules/stock/service';
import {StockService} from '../../src/modules/stock/service';
import {NewOrderInput} from '../../src/modules/order/input/order.input';
import {OrderStatus} from '@prisma/client';
import {OrderRepository} from '../../src/modules/order/repository/order.repository';
import {PrismaService} from '../../src/prisma';
import {PickerService} from '../../src/modules/picker/service/picker.service';
import {ConfigService} from '@nestjs/config';
import {
    IProductService,
    ProductService,
} from '../../src/modules/product/service';
import {
    IProductRepository,
    ProductRepository,
} from '../../src/modules/product/repository';

describe('EventService Unit Test', () => {
    let orderService: IOrderService;
    let stockService: IStockService;
    const date = Date.now()

    beforeEach(async () => {
        const orderServiceProvider = {
            provide: IOrderService,
            useClass: OrderService,
        };
        const orderRepositoryProvider = {
            provide: IOrderRepository,
            useClass: OrderRepository,
        };
        // const stockServiceProvider = {
        //     provide: IStockService,
        //     useClass: StockService,
        // };
        const productServiceProvider = {
            provide: IProductService,
            useClass: ProductService,
        };

        const app: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                PrismaService,
                ConfigService,
                orderRepositoryProvider,
                orderServiceProvider,
                OrderService,
                PickerService,
                productServiceProvider,
                {
                    provide: IProductRepository,
                    useClass: ProductRepository,
                },
            ],
        }).compile();
        orderService = app.get<OrderService>(OrderService);
    });

    // it('get all', async () => {
    //     const result = await orderService.getAllOrders();
    //     expect(result).toEqual([{
    //         id: 1,
    //         createdAt: Date.prototype,
    //         status: 'NOT_PREPARED',
    //         totalAmount: 100,
    //         address: 'Pilar',
    //     }]);
    // });

    it('create order', async () => {
        // when creating an order, the order should leave the stock table
        // and get into the order table with a 'not prepared' status

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
        expect(result).toEqual([
            {
                id: 1,
                createdAt: date,
                status: 'NOT_STARTED',
                totalAmount: 150,
                address: 'CABA',
            },
        ]);
    });

    // it('add stock', async () => {
    //     // when adding stock, the stock should get into the stock table
    //     const result = await stockService.getAllItemsInStock();
    //     expect(result).toEqual([{
    //         id: 1,
    //         createdAt: Date.prototype,
    //         status: 'NOT_PREPARED',
    //         totalAmount: 100,
    //         address: 'Pilar',
    //     }]);
    // });
});
