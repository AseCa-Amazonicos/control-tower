import {MockPickerService} from './util/mock.picker.service';
import {OrderDto} from '../../src/modules/order/dto';
import {ProductOrderInput} from '../../src/modules/order/input/product.order.input';

describe('MockPickerService', () => {
    let service: MockPickerService;

    beforeEach(() => {
        service = new MockPickerService();
    });

    it('should add picker orders', () => {
        const mockOrder: OrderDto = {
            id: 1,
            status: 'NOT_STARTED',
            createdAt: new Date(),
            totalAmount: 200,
            address: 'CABA',
        };

        const mockProducts: ProductOrderInput[] = [
            {
                productId: 2,
                quantity: 1,
            },
            {
                productId: 3,
                quantity: 2,
            },
        ];

        service.addPickerOrders(mockOrder, mockProducts);
        expect(service['orders']).toContain(mockOrder);

        mockProducts.forEach(product => {
            expect(service['productOrder']).toContain(product);
        });
    });

    it('should get picker orders', () => {
        const mockOrder: OrderDto = {
            id: 1,
            status: 'NOT_STARTED',
            createdAt: new Date(),
            totalAmount: 200,
            address: 'CABA',
        };

        service.addPickerOrders(mockOrder, []);
        const pickerOrders = service.getPickerOrders();
        expect(pickerOrders).toEqual([
            {
                orderId: mockOrder.id,
                status: mockOrder.status,
            },
        ]);
    });

    it('should get picker stock', () => {
        const pickerStock = service.getPickerStock();
        expect(pickerStock).toEqual([
            {
                productId: 1,
                quantity: 100,
            },
        ]);
    });

    it('should add stock', () => {
        const mockProduct = {
            productId: 1,
            quantity: 100,
        };
        service.addStock(mockProduct);
        expect(service['stock']).toContain(mockProduct);
    });

    it('add and get stock', () => {
        const mockProduct = {
            productId: 1,
            quantity: 100,
        };
        service.addStock(mockProduct);
        const stock = service.getPickerStock();
        expect(stock).toContain(mockProduct);
    });
});
