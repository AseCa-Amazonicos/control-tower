import {OrderDto} from "../dto/order.dto";

export abstract class IOrderService{
    abstract getAllOrders() : Promise<OrderDto[]>
}
