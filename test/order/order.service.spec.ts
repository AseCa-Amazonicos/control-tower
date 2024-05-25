import {Test, TestingModule} from "@nestjs/testing";
import {IOrderService, OrderService} from "../../src/modules/order/service";
import {IOrderRepository} from "../../src/modules/order/repository";
import {OrderRepositoryUtil} from "./util/order.repository.util";
import {IStockService} from "../../src/modules/stock/service/stock.service.interface";
import {StockService} from "../../src/modules/stock/service/stock.service";
import {NewOrderInput} from "../../src/modules/order/input/order.input";
import {OrderStatus} from "@prisma/client";

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
            useClass: OrderRepositoryUtil,
        };
        const stockServiceProvider = {
            provide: IStockService,
            useClass: StockService,
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
            status: 'NOT_PREPARED',
            totalAmount: 100,
            address: 'Pilar',
        }]);
    });

    it('create order', async () => {
        // when creating an order, the order should leave the stock table
        // and get into the order table with a 'not prepared' status

        const input = new NewOrderInput();
        input.status = 'NOT_PREPARED';
        input.totalAmount = 150;
        input.address = 'CABA';

        await orderService.createOrder(input);
        const result = await orderService.getAllOrders();
        expect(result).toEqual([{
            id: 1,
            createdAt: Date.prototype,
            status: 'NOT_PREPARED',
            totalAmount: 100,
            address: 'Pilar',
        }, {
            id: 2,
            createdAt: Date.prototype,
            status: 'NOT_PREPARED',
            totalAmount: 150,
            address: 'CABA',
        }]);
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
})
