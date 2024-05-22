import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../../prisma";
import {IOrderRepository} from "./order.repository.interface";
import { OrderDto } from "../dto/order.dto";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(private prisma: PrismaService) {
    }

    async getAllOrders(): Promise<OrderDto[]> {
        return this.prisma.order.findMany();
    }

}
