import {Test, TestingModule} from '@nestjs/testing';
import {IOrderService, OrderService} from '../../src/modules/order/service';
import {IOrderRepository} from '../../src/modules/order/repository';
import {IStockService, StockService} from '../../src/modules/stock/service';
import {NewOrderInput} from '../../src/modules/order/input/order.input';
import {OrderRepository} from '../../src/modules/order/repository/order.repository';
import {PrismaService} from '../../src/prisma';
import {PickerService} from '../../src/modules/picker/service/picker.service';
import {ConfigService} from '@nestjs/config';
import {IPickerService} from '../../src/modules/picker/service/picker.interface.service';
import {
    IProductService,
    ProductService,
} from '../../src/modules/product/service';
import {
    IProductRepository,
    ProductRepository,
} from '../../src/modules/product/repository';
import {MockOrderRepository} from './util/order.repository.util';

describe('EventService Unit Test', () => {
    let orderService: IOrderService;
    let stockService: IStockService;
    let mockOrderRepository: MockOrderRepository;

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
        const pickerServiceProvider = {
            provide: IPickerService,
            useClass: PickerService,
        };
        const productServiceProvider = {
            provide: IProductService,
            useClass: ProductService,
        };
        const productRepositoryProvider = {
            provide: IProductRepository,
            useClass: ProductRepository,
        };
        mockOrderRepository = new MockOrderRepository();

        const app: TestingModule = await Test.createTestingModule({
            providers: [
                PrismaService,
                ConfigService,
                orderServiceProvider,
                orderRepositoryProvider,
                pickerServiceProvider,
                productServiceProvider,
                productRepositoryProvider,
                stockServiceProvider,
            ],
        }).compile();

        orderService = app.get<IOrderService>(IOrderService);
        stockService = app.get<IStockService>(IStockService);
    });

    it('create order', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'NOT_STARTED',
            totalAmount: 200,
            address: 'CABA',
            products: [
                {
                    productId: 2,
                    quantity: 1,
                },
            ],
        };

        const createdOrder =
            await mockOrderRepository.createOrder(newOrderInput);

        expect(createdOrder).toHaveProperty('id');
        expect(createdOrder.status).toBe(newOrderInput.status);
        expect(createdOrder.totalAmount).toBe(newOrderInput.totalAmount);
        expect(createdOrder.address).toBe(newOrderInput.address);
    });

    it('fetch order by id', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'NOT_STARTED',
            totalAmount: 200,
            address: 'Palermo',
            products: [
                {
                    productId: 4,
                    quantity: 1,
                },
            ],
        };

        const createdOrder =
            await mockOrderRepository.createOrder(newOrderInput);

        const fetchedOrder = await mockOrderRepository.getById(createdOrder.id);

        expect(fetchedOrder).toEqual(createdOrder);
    });

    it('fetch all orders', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'NOT_STARTED',
            totalAmount: 12,
            address: 'Belgrano',
            products: [
                {
                    productId: 5,
                    quantity: 1,
                },
            ],
        };
        const otherOrderInput: NewOrderInput = {
            status: 'NOT_STARTED',
            totalAmount: 15,
            address: 'GBA',
            products: [
                {
                    productId: 6,
                    quantity: 3,
                },
            ],
        };

        const createdOrder =
            await mockOrderRepository.createOrder(newOrderInput);
        const otherOrder =
            await mockOrderRepository.createOrder(otherOrderInput);
        const orders = await mockOrderRepository.getAllOrders();

        expect(orders.length).toBe(3); //because it has a default one on the constructor
        expect(orders).toContainEqual(createdOrder);
        expect(orders).toContainEqual(otherOrder);
    });

    it('create ready to ship order', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'READY_TO_SHIP',
            totalAmount: 200,
            address: 'CABA',
            products: [
                {
                    productId: 2,
                    quantity: 1,
                },
            ],
        };

        const createdOrder =
            await mockOrderRepository.createOrder(newOrderInput);

        expect(createdOrder).toHaveProperty('id');
        expect(createdOrder.status).toBe(newOrderInput.status);
        expect(createdOrder.totalAmount).toBe(newOrderInput.totalAmount);
        expect(createdOrder.address).toBe(newOrderInput.address);
    });

    it('create and get all orders ready to ship', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'READY_TO_SHIP',
            totalAmount: 400,
            address: 'Pilar',
            products: [
                {
                    productId: 2,
                    quantity: 1,
                },
            ],
        };
        await mockOrderRepository.createOrder(newOrderInput);

        const result = await mockOrderRepository.getAllReadyToShip();

        result.forEach(order => {
            expect(order.status).toBe('READY_TO_SHIP');
        });
    });

    it('create shipping order', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'SHIPPING',
            totalAmount: 200,
            address: 'CABA',
            products: [
                {
                    productId: 2,
                    quantity: 1,
                },
            ],
        };

        const createdOrder =
            await mockOrderRepository.createOrder(newOrderInput);

        expect(createdOrder).toHaveProperty('id');
        expect(createdOrder.status).toBe(newOrderInput.status);
        expect(createdOrder.totalAmount).toBe(newOrderInput.totalAmount);
        expect(createdOrder.address).toBe(newOrderInput.address);
    });

    it('get shipping orders', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'SHIPPING',
            totalAmount: 200,
            address: 'CABA',
            products: [
                {
                    productId: 2,
                    quantity: 1,
                },
            ],
        };

        await mockOrderRepository.createOrder(newOrderInput);
        const result = await mockOrderRepository.getShippingOrders();

        result.forEach(order => {
            expect(order.status).toBe('SHIPPING');
        });
    });

    it('update order status from READY_TO_SHIP to SHIPPING', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'READY_TO_SHIP',
            totalAmount: 200,
            address: 'CABA',
            products: [
                {
                    productId: 2,
                    quantity: 1,
                },
            ],
        };

        const createdOrder =
            await mockOrderRepository.createOrder(newOrderInput);
        const updatedOrder = await mockOrderRepository.updateOrderStatus(
            createdOrder.id,
            'SHIPPING'
        );

        expect(updatedOrder.status).toBe('SHIPPING');
    });

    it('update order status from SHIPPING to DELIVERED', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'SHIPPING',
            totalAmount: 200,
            address: 'CABA',
            products: [
                {
                    productId: 2,
                    quantity: 1,
                },
            ],
        };

        const createdOrder =
            await mockOrderRepository.createOrder(newOrderInput);
        const updatedOrder = await mockOrderRepository.updateOrderStatus(
            createdOrder.id,
            'DELIVERED'
        );

        expect(updatedOrder.status).toBe('DELIVERED');
    });

    it('add product to order', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'NOT_STARTED',
            totalAmount: 23,
            address: 'SoHo',
            products: [
                {
                    productId: 2,
                    quantity: 1,
                },
            ],
        };

        const createdOrder =
            await mockOrderRepository.createOrder(newOrderInput);

        const productId = 2;
        const quantity = 1;
        const addedProduct = await mockOrderRepository.addProductToOrder(
            productId,
            quantity,
            createdOrder.id
        );

        expect(addedProduct.productId).toBe(productId);
        expect(addedProduct.quantity).toBe(quantity);
        expect(addedProduct.orderId).toBe(createdOrder.id);
    });

    it('get product in order', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'NOT_STARTED',
            totalAmount: 200,
            address: 'CABA',
            products: [
                {
                    productId: 2,
                    quantity: 1,
                },
            ],
        };

        const createdOrder =
            await mockOrderRepository.createOrder(newOrderInput);

        const productId = 2;
        const quantity = 1;
        await mockOrderRepository.addProductToOrder(
            productId,
            quantity,
            createdOrder.id
        );

        const productsInOrder = await mockOrderRepository.getProductsInOrder(
            createdOrder.id
        );

        expect(productsInOrder[0].productId).toBe(productId);
        expect(productsInOrder[0].quantity).toBe(quantity);
        expect(productsInOrder[0].orderId).toBe(createdOrder.id);
    });

    it('add two products to order', async () => {
    const newOrderInput: NewOrderInput = {
        status: 'NOT_STARTED',
        totalAmount: 200,
        address: 'CABA',
        products: [
            {
                productId: 2,
                quantity: 1,
            },
            {
                productId: 3,
                quantity: 2,
            },
        ],
    };

    const createdOrder = await mockOrderRepository.createOrder(newOrderInput);

    const productId1 = 2;
    const quantity1 = 1;
    const addedProduct1 = await mockOrderRepository.addProductToOrder(productId1, quantity1, createdOrder.id);

    const productId2 = 3;
    const quantity2 = 2;
    const addedProduct2 = await mockOrderRepository.addProductToOrder(productId2, quantity2, createdOrder.id);

    expect(addedProduct1.productId).toBe(productId1);
    expect(addedProduct1.quantity).toBe(quantity1);
    expect(addedProduct1.orderId).toBe(createdOrder.id);

    expect(addedProduct2.productId).toBe(productId2);
    expect(addedProduct2.quantity).toBe(quantity2);
    expect(addedProduct2.orderId).toBe(createdOrder.id);
});

    it('should not create order with negative total amount', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'NOT_STARTED',
            totalAmount: -200,
            address: 'CABA',
            products: [],
        };
        await expect(
            mockOrderRepository.createOrder(newOrderInput)
        ).rejects.toThrow('Total amount cannot be negative');
    });

    it('should not create order with empty products array', async () => {
        const newOrderInput: NewOrderInput = {
            status: 'NOT_STARTED',
            totalAmount: 200,
            address: 'CABA',
            products: [],
        };
        await expect(
            mockOrderRepository.createOrder(newOrderInput)
        ).rejects.toThrow('The products array cannot be empty or null');
    });

});
