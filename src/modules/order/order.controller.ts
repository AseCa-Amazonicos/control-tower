import {Body, Controller, Get, Post, Request} from "@nestjs/common";
import {IOrderService} from "./service";
import {OrderDto} from "./dto/order.dto";
import {NewOrderInput} from "./input/order.input";
import {Request as ExpressRequest} from 'express';

@Controller('order')
export class OrderController {
    constructor(private orderService: IOrderService) {}

    @Get()
    async findAll(): Promise<OrderDto[]> {
        return this.orderService.getAllOrders()
    }

    @Post()
    createOrder(@Request() req: ExpressRequest, @Body() input: NewOrderInput): Promise<OrderDto> {
        return this.orderService.createOrder(input)
    }

    @Get("ready_to_ship")
    getAllReadyToShipOrders(): Promise<OrderDto[]>{
        return this.orderService.getAllReadyToShip()
    }
}
