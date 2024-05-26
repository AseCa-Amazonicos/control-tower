import {OrderDto} from "../dto/order.dto";
import {NewOrderInput} from "../input/order.input";
import {OrderStatus} from "@prisma/client";
import {ProductOrderInput} from "../input/product.order.input";
import {ProductInOrderDto} from "../dto";

export abstract class IOrderRepository{
    abstract getAllOrders() : Promise<OrderDto[]>

    abstract createOrder(input: NewOrderInput): Promise<OrderDto>

    abstract updateOrderStatus(id: number, status: OrderStatus): Promise<OrderDto>

    abstract addProductToOrder(productId: number, quantity: number, orderId: number): Promise<ProductInOrderDto>

    abstract getById(orderId: number): Promise<OrderDto>

    abstract getProductsInOrder(orderId: number): Promise<ProductInOrderDto[]>
}
