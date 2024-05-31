// import {Order} from "@prisma/client";
// import {IOrderRepository} from "../../../src/modules/order/repository";
// import {OrderDto} from "../../../src/modules/order/dto";
// import {NewOrderInput} from "../../../src/modules/order/input/order.input";
//
// export class OrderRepositoryUtil implements IOrderRepository {
//     testOrder:Order = {
//         id: 1,
//         createdAt: Date.prototype,
//         status: 'NOT_STARTED',
//         totalAmount: 100,
//         address: 'Pilar',
//     };
//     orders: Order[] = [this.testOrder];
//     id = 1;
//
//     getAllOrders(): Promise<OrderDto[]> {
//         return Promise.resolve(this.orders);
//     }
//
//     createOrder(input: NewOrderInput): Promise<OrderDto> {
//         return Promise.resolve(undefined);
//     }
//
//
//
// }
