import {Injectable, PreconditionFailedException} from "@nestjs/common";
import {IOrderRepository} from "../repository";
import {IOrderService} from "./order.service.interface";
import {OrderDto} from "../dto/order.dto";
import {NewOrderInput} from "../input/order.input";
import {PickerOrderDto} from "../dto/picker.order.dto";
import {PickerService} from "../../picker/service/picker.service";
import {ProductOrderInput} from "../input/product.order.input";
import {OrderWithProductsDto} from "../dto";

@Injectable()
export class OrderService implements IOrderService{
    constructor(private repository: IOrderRepository, private pickerService: PickerService) {}

    getAllOrders(): Promise<OrderDto[]> {
        return this.repository.getAllOrders()
    }

    async getAllOrdersWProducts(): Promise<OrderWithProductsDto[]> {
        let orders: OrderDto[] = await this.getAllOrders()
        const orderPromises: Promise<OrderWithProductsDto>[] = orders.map(
            order => this.getOrderWProducts(order)
        );
        return Promise.all(orderPromises);
    }

    async createOrder(input: NewOrderInput): Promise<OrderDto> {
        if(input.totalAmount <= 0) throw new PreconditionFailedException("The total amount must be greater that 0")
        let order = await this.repository.createOrder(input)
        await this.addProductsToOrder(input.products, order)
        await this.pickerService.addPickerOrders(order)
        return order
    }

    async getAllReadyToShip(): Promise<OrderDto[]> {
        let orders: OrderDto[] = await this.getAllOrders()
        const pickerOrders: PickerOrderDto[] = await this.pickerService.getPickerOrders();
        if(this.pickerHasTheSameReadyToShipOrders(pickerOrders, orders))
            return this.filterByReadyToShip(orders)
        else {
            pickerOrders.forEach(pickerOrder =>
                this.orderContainsPicker(pickerOrder, orders))
            orders = await this.getAllOrders()
            return this.filterByReadyToShip(orders)
        }
    }

    async getAllDelivered(): Promise<OrderDto[]> {
        let orders: OrderDto[] = await this.getAllOrders()
        return orders.filter(
            order => order.status == "DELIVERED"
        )
    }

    async getAllShipping(): Promise<OrderDto[]> {
        let orders: OrderDto[] = await this.getAllOrders()
        return orders.filter(
            order => order.status == "SHIPPING"
        )
    }

    private orderContainsPicker(pickerOrder: PickerOrderDto, orders: OrderDto[]) {
        orders.forEach(
            async order => {
                await this.orderEqualsPickerOrder(order, pickerOrder)
            }
        )
    }

    private filterByReadyToShip(orders: OrderDto[]): OrderDto[] {
        return orders.filter(
            order => order.status == "READY_TO_SHIP"
        )
    }

    private pickerHasTheSameReadyToShipOrders(pickerOrders: PickerOrderDto[], orders: OrderDto[]) {
        return this.pickerService.filterByReadyToShipPicker(pickerOrders).length == this.filterByReadyToShip(orders).length
            && pickerOrders.length == orders.length
    }

    private async orderEqualsPickerOrder(order: OrderDto, pickerOrder: PickerOrderDto){
        if (order.id == pickerOrder.orderId && order.status != pickerOrder.status){
            if(pickerOrder.status == "READY_TO_SHIP" && order.status == "NOT_STARTED"){
                await this.repository.updateOrderStatus(order.id, "READY_TO_SHIP")
            }
        }
    }

    private async addProductsToOrder(products: ProductOrderInput[], order: OrderDto) {
        for (const product of products) {
            console.log(product);
            await this.repository.addProductToOrder(product.productId, product.quantity, order.id);
        }
    }

    async getById(orderId: number): Promise<OrderWithProductsDto> {
        let order = await this.repository.getById(orderId)
        return this.getOrderWProducts(order)
    }

    private async getOrderWProducts(order: OrderDto): Promise<OrderWithProductsDto> {
        let products = await this.repository.getProductsInOrder(order.id)
        return {
            id: order.id,
            status: order.status,
            createdAt: order.createdAt,
            totalAmount: order.totalAmount,
            address: order.address,
            products: products
        }
    }
}
