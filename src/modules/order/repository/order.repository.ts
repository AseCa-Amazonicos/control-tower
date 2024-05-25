import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../../prisma";
import {IOrderRepository} from "./order.repository.interface";
import { OrderDto } from "../dto/order.dto";
import {NewOrderInput} from "../input/order.input";
import { $Enums } from "@prisma/client";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(private prisma: PrismaService) {
    }

    updateOrderStatus(id: number, status: $Enums.OrderStatus): Promise<OrderDto> {
        throw new Error("Method not implemented.");
    }

    async getAllOrders(): Promise<OrderDto[]> {
        return this.prisma.order.findMany();
    }

    createOrder(input: NewOrderInput): Promise<OrderDto> {
        return this.prisma.order.create({
            data: {
                status: input.status,
                totalAmount: input.totalAmount,
                address: input.address
            }
        })
    }

}
