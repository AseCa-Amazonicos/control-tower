import {Test, TestingModule} from "@nestjs/testing";
import {IOrderService, OrderService} from "../../src/modules/order/service";
import {IOrderRepository} from "../../src/modules/order/repository";
import {OrderRepositoryUtil} from "./util/order.repository.util";

describe('EventService Unit Test', () => {
    let orderService: IOrderService;

    beforeEach(async () => {
        const orderServiceProvider = {
            provide: IOrderService,
            useClass: OrderService,
        };
        const orderRepositoryProvider = {
            provide: IOrderRepository,
            useClass: OrderRepositoryUtil,
        };

        const app: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                orderRepositoryProvider,
                orderServiceProvider,
            ],
        }).compile();
        orderService = app.get<IOrderService>(IOrderService);
    });

    it('get all', async () => {
        const result = await orderService.getAllOrders();
        expect(result).toEqual([{
            id: 1,
            createdAt: Date.prototype,
            status: '',
            totalAmount: 100,
            userId: 1,
            mail: 'test@test.com',
        }]);
    });
})
