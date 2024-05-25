import {OrderDto} from "../dto/order.dto";
import {NewOrderInput} from "../input/order.input";
import {OrderStatus} from "@prisma/client";

export abstract class IOrderRepository{
    abstract getAllOrders() : Promise<OrderDto[]>

    abstract createOrder(input: NewOrderInput): Promise<OrderDto>

    abstract updateOrderStatus(id: number, status: OrderStatus): Promise<OrderDto>
}
