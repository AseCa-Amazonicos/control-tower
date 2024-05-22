import {Controller, Get} from "@nestjs/common";
import {IOrderService} from "./service";
import {OrderDto} from "./dto/order.dto";

@Controller('order')
export class OrderController {
    constructor(private orderService: IOrderService) {}

    @Get()
    async findAll(): Promise<OrderDto[]> {
        return this.orderService.getAllOrders()
    }
}
