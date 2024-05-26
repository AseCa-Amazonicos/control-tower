import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../../prisma";
import {IOrderRepository} from "./order.repository.interface";
import { OrderDto } from "../dto/order.dto";
import {NewOrderInput} from "../input/order.input";
import {OrderStatus} from "@prisma/client";
import {ProductOrderInput} from "../input/product.order.input";
import {ProductInOrderDto} from "../dto";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(private prisma: PrismaService) {
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

    updateOrderStatus(id: number, status: OrderStatus): Promise<OrderDto> {
        return this.prisma.order.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })
    }

    addProductToOrder(productId: number, quantity: number, orderId: number): Promise<ProductInOrderDto> {
        return this.prisma.productOnOrders.create({
            data: {
                orderId: orderId,
                productId: productId,
                quantity: quantity
            }
        })
    }

    getById(orderId: number): Promise<OrderDto> {
        return this.prisma.order.findUnique({
            where: {
                id: orderId
            }
        })
    }

    getProductsInOrder(orderId: number): Promise<ProductInOrderDto[]> {
        return this.prisma.productOnOrders.findMany({
            where: {
                orderId: orderId
            }
        })
    }
}
