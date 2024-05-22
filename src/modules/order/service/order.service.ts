import {Injectable, PreconditionFailedException} from "@nestjs/common";
import {IOrderRepository} from "../repository";
import {IOrderService} from "./order.service.interface";
import {OrderDto} from "../dto/order.dto";
import {NewOrderInput} from "../input/order.input";

@Injectable()
export class OrderService implements IOrderService{
    constructor(private repository: IOrderRepository) {}

    getAllOrders(): Promise<OrderDto[]> {
        return this.repository.getAllOrders()
    }

    createOrder(input: NewOrderInput): Promise<OrderDto> {
        if(input.totalAmount <= 0) throw new PreconditionFailedException("The total amount must be greater that 0")
        return this.repository.createOrder(input)
    }

}
