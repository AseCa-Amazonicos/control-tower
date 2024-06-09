import {Test, TestingModule} from '@nestjs/testing';
import {IOrderService, OrderService} from '../../src/modules/order/service';
import {IOrderRepository} from '../../src/modules/order/repository';
import {IStockService} from '../../src/modules/stock/service';
import {StockService} from '../../src/modules/stock/service';
import {NewOrderInput} from '../../src/modules/order/input/order.input';
import {
    IProductService,
    ProductService,
} from '../../src/modules/product/service';
import {
    IProductRepository,
} from '../../src/modules/product/repository';
import {IPickerService} from "../../src/modules/picker/service/picker.interface.service";
import {MockPickerService} from "../picker/util/mock.picker.service";
import {MockOrderRepository} from "./util/order.repository.util";
import {MockProductRepository} from "../product/util/mock.product.repository";

describe('EventService Unit Test', () => {
    let orderService: IOrderService;
    const date = Date.now()

    beforeEach(async () => {
        const orderServiceProvider = {
            provide: IOrderService,
            useClass: OrderService,
        };
        const orderRepositoryProvider = {
            provide: IOrderRepository,
            useValue: MockOrderRepository,
        };
        const productServiceProvider = {
            provide: IProductService,
            useClass: ProductService,
        };
        const stockProvider = {
            provide: IStockService,
            useClass: StockService,
        };
        const pickerService = {
            provide: IPickerService,
            useClass: MockPickerService,
        };

        const app: TestingModule = await Test.createTestingModule({
            providers: [
                orderRepositoryProvider,
                orderServiceProvider,
                productServiceProvider,
                {
                    provide: IProductRepository,
                    useClass: MockProductRepository,
                },
                stockProvider,
                pickerService
            ],
        })
        .compile();

        orderService = app.get<IOrderService>(IOrderService);
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

        // orderRepository.createOrder(input)
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
