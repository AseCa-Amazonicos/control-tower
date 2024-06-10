import {Injectable} from '@nestjs/common';
import {IPickerService} from '../../../src/modules/picker/service/picker.interface.service';
import {OrderDto, PickerOrderDto} from '../../../src/modules/order/dto';
import {ProductOrderInput} from '../../../src/modules/order/input/product.order.input';
import {PickerStockDto} from '../../../src/modules/stock/dto/picker.stock.dto';

@Injectable()
export class MockPickerService extends IPickerService {
    private orders: OrderDto[];
    private productOrder: ProductOrderInput[];
    private stock: PickerStockDto[] = [];

    constructor() {
        super();
        this.orders = [];
        this.productOrder = [];
        this.stock = [];
    }

    addPickerOrders(order: OrderDto, products: ProductOrderInput[]) {
        this.orders.push(order);
        products.forEach(product => this.productOrder.push(product));
    }

    getPickerOrders(): PickerOrderDto[] {
        return this.orders.map(order => this.getPickerOrderDto(order));
    }

    getPickerStock() {
        this.stock.push(this.getProduct());
        return this.stock;
    }

    addStock(product: PickerStockDto) {
        this.stock.push(product);
    }

    private getPickerOrderDto(order: OrderDto) {
        return {
            orderId: order.id,
            status: order.status,
        };
    }

    private getProduct(): PickerStockDto {
        return {
            productId: 1,
            quantity: 100,
        };
    }
}
