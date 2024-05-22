import {Order} from "@prisma/client";
import {IOrderRepository} from "../../../src/modules/order/repository";
import {OrderDto} from "../../../src/modules/order/dto/order.dto";

export class OrderRepositoryUtil implements IOrderRepository {
    testOrder:Order = {
        id: 1,
        createdAt: Date.prototype,
        status: '',
        totalAmount: 100,
        userId: 1,
        mail: 'test@test.com',
    };
    orders: Order[] = [this.testOrder];
    id = 1;

    getAllOrders(): Promise<OrderDto[]> {
        return Promise.resolve(this.orders);
    }



}
