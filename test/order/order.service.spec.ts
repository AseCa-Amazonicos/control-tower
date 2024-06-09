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
    let productService: IProductService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: IOrderRepository,
                    useClass: MockOrderRepository,
                },
                {
                    provide: IOrderService,
                    useClass: OrderService,
                },
                {
                    provide: IProductService,
                    useClass: ProductService,
                },
                {
                    provide: IProductRepository,
                    useClass: MockProductRepository,
                },
                {
                    provide: IStockService,
                    useClass: StockService,
                },
                {
                    provide: IPickerService,
                    useClass: MockPickerService,
                },
            ],
        }).compile();

        orderService = app.get<IOrderService>(IOrderService);
        productService = app.get<IProductService>(IProductService);
    });

    it('create order', async () => {
        // when creating an order, the order should leave the stock table
        // and get into the order table with a 'not prepared' status

        const input = new NewOrderInput();
        input.status = 'NOT_STARTED';
        input.totalAmount = 150;
        input.address = 'CABA';
        const product = await productService.createProduct({
            name: "product",
            price: 1
        })

        console.log(product.id)
        input.products = [
            {
                productId: product.id,
                quantity: 1,
            },
        ];
        // orderRepository.createOrder(input)
        const result = await orderService.createOrder(input);
        expect(result).toEqual(
            {
                id: 1,
                status: 'NOT_STARTED',
                createdAt: {},
                totalAmount: 150,
                address: 'CABA',
            },
        );
    });
});
