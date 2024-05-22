import {OrderDto} from "../dto/order.dto";

export abstract class IOrderRepository{
    abstract getAllOrders() : Promise<OrderDto[]>
}
