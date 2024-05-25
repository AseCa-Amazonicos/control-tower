import {OrderDto} from "../dto/order.dto";
import {NewOrderInput} from "../input/order.input";

export abstract class IOrderService{
    abstract getAllOrders() : Promise<OrderDto[]>
    abstract createOrder(input: NewOrderInput): Promise<OrderDto>

    abstract getAllReadyToShip(): Promise<OrderDto[]>
    abstract getAllDelivered(): Promise<OrderDto[]>
    abstract getAllShipping(): Promise<OrderDto[]>
}
