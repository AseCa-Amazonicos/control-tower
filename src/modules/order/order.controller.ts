import {Body, Controller, ForbiddenException, Get, HttpCode, Param, Post, Request} from "@nestjs/common";
import {IOrderService} from "./service";
import {OrderDto} from "./dto/order.dto";
import {NewOrderInput} from "./input/order.input";
import {Request as ExpressRequest} from 'express';
import {OrderWithProductsDto} from "./dto";

@Controller('order')
export class OrderController {
    constructor(private orderService: IOrderService) {}

    @Get()
    async findAll(): Promise<OrderDto[]> {
        return this.orderService.getAllOrders()
    }

    @Post()
    @HttpCode(201)
    createOrder(@Request() req: ExpressRequest, @Body() input: NewOrderInput): Promise<OrderDto> {
        return this.orderService.createOrder(input)
    }

    @Get("ready_to_ship")
    getAllReadyToShipOrders(): Promise<OrderDto[]>{
        return this.orderService.getAllReadyToShip()
    }

    @Get("delivered")
    getAllDelivered(): Promise<OrderDto[]>{
        return this.orderService.getAllDelivered()
    }

    @Get("shipping")
    getAllShipping(): Promise<OrderDto[]>{
        return this.orderService.getAllShipping()
    }

    @Get(':id')
    async getById(
        @Request() req: ExpressRequest,
        @Param() param: string): Promise<OrderWithProductsDto>{
        const orderId = parseInt(param['id']);
        if (Number.isNaN(orderId)) {
            throw new ForbiddenException('Order id must be a number');
        } else {
            return this.orderService.getById(orderId);
        }
    }
}
