import {Order, OrderStatus} from "@prisma/client";
import {IOrderRepository} from "../../../src/modules/order/repository";
import {OrderDto, ProductInOrderDto} from "../../../src/modules/order/dto";
import {NewOrderInput} from "../../../src/modules/order/input/order.input";

export class MockOrderRepository implements IOrderRepository {
    testOrder: Order = {
        id: 1,
        createdAt: Date.prototype,
        status: 'NOT_STARTED',
        totalAmount: 100,
        address: 'Pilar',
    };
    orders: OrderDto[] = [this.testOrder];
    productInOrders:  ProductInOrderDto[] = [];
    id = 1;

    getAllOrders(): Promise<OrderDto[]> {
        return Promise.resolve(this.orders);
    }

    createOrder(input: NewOrderInput): Promise<OrderDto> {
        const order: OrderDto = this.getOrderDto(input);
        this.orders.push(order);
        return Promise.resolve(order);
    }

    addProductToOrder(productId: number, quantity: number, orderId: number): Promise<ProductInOrderDto> {
        const product: ProductInOrderDto = this.getProductDto(productId, quantity, orderId)
        this.productInOrders.push(product);
        return Promise.resolve(product);
    }

    getById(orderId: number): Promise<OrderDto> {
        return Promise.resolve(this.orders.filter(
            order => order.id === orderId
        )[0]);
    }

    getProductsInOrder(orderId: number): Promise<ProductInOrderDto[]> {
        return Promise.resolve(this.productInOrders.filter(
            product => product.orderId === orderId
        ));
    }

    updateOrderStatus(id: number, status: OrderStatus): Promise<OrderDto> {
        const index = this.orders.findIndex(order => order.id === id);
        if (index !== -1) {
            // Update the status of the order
            this.orders[index].status = status;
            return Promise.resolve(this.orders[index]);
        } else {
            // Order with the specified ID not found
            return undefined;
        }
    }


    private getOrderDto(input: NewOrderInput): OrderDto {
        return {
            id: this.id++,
            status: input.status,
            createdAt: Date.prototype,
            totalAmount: input.totalAmount,
            address: input.address
        };
    }

    private getProductDto(productId: number, quantity: number, orderId: number): ProductInOrderDto {
        return {
            orderId: orderId,
            quantity: quantity,
            productId: productId
        };
    }
}
