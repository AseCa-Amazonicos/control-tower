import {Injectable} from "@nestjs/common";
import {IOrderRepository} from "../repository";
import {IOrderService} from "./order.service.interface";
import {OrderDto} from "../dto/order.dto";

@Injectable()
export class OrderService implements IOrderService{
    constructor(private repository: IOrderRepository) {}

    getAllOrders(): Promise<OrderDto[]> {
        return this.repository.getAllOrders()
    }

}
