import {OrderDto} from "../dto/order.dto";
import {NewOrderInput} from "../input/order.input";
import {OrderWithProductsDto} from "../dto";

export abstract class IOrderService{
    abstract getAllOrders() : Promise<OrderDto[]>
    abstract getAllOrdersWProducts(): Promise<OrderWithProductsDto[]>
    abstract createOrder(input: NewOrderInput): Promise<OrderDto>

    abstract getAllReadyToShip(): Promise<OrderDto[]>
    abstract getAllDelivered(): Promise<OrderDto[]>
    abstract getAllShipping(): Promise<OrderDto[]>

    abstract getById(orderId: number): Promise<OrderWithProductsDto>
}
