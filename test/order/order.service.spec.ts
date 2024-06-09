import {Test, TestingModule} from '@nestjs/testing';
import {IOrderService, OrderService} from '../../src/modules/order/service';
import {IOrderRepository} from '../../src/modules/order/repository';
import {IStockService} from '../../src/modules/stock/service';
import {StockService} from '../../src/modules/stock/service';
import {NewOrderInput} from '../../src/modules/order/input/order.input';
import {OrderRepository} from '../../src/modules/order/repository/order.repository';
import {PrismaService} from '../../src/prisma';
import {ConfigService} from '@nestjs/config';
import {
    IProductService,
    ProductService,
} from '../../src/modules/product/service';
import {
    IProductRepository,
    ProductRepository,
} from '../../src/modules/product/repository';
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { StockModule } from '../../src/modules/stock/stock.module';

describe('EventService Unit Test', () => {
    let orderService: IOrderService;
    let orderRepository: DeepMocked<IOrderRepository>;
    const date = Date.now()

    beforeEach(async () => {
        orderRepository = createMock<IOrderRepository>()

        const orderServiceProvider = {
            provide: IOrderService,
            useClass: OrderService,
        };
        const orderRepositoryProvider = {
            provide: IOrderRepository,
            useValue: orderRepository,
        };
        const productServiceProvider = {
            provide: IProductService,
            useClass: ProductService,
        };
        const stockProvider = {
            provide: IStockService,
            useClass: StockService,
        };

        const app: TestingModule = await Test.createTestingModule({
            imports: [StockModule],
            providers: [
                PrismaService,
                ConfigService,
                //orderRepositoryProvider,
                orderServiceProvider,
                OrderService,
                productServiceProvider,
                {
                    provide: IProductRepository,
                    useClass: ProductRepository,
                },
                stockProvider,
                {
                    provide: IOrderRepository,
                    useValue: orderRepository,
                }
            ],
        })
        .useMocker(createMock)
        .compile();

        orderService = app.get<OrderService>(OrderService);
    });

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

        orderRepository.createOrder.mockResolvedValueOnce({
            id: 1,
            createdAt: new Date(date),
            status: 'NOT_STARTED',
            totalAmount: 150,
            address: 'CABA',
        })
        const result = await orderService.createOrder(input);
        expect(result).toEqual(
            {
                id: 1,
                createdAt: date,
                status: 'NOT_STARTED',
                totalAmount: 150,
                address: 'CABA',
            },
        );
    });
});
