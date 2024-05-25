import {Injectable, PreconditionFailedException} from "@nestjs/common";
import {IOrderRepository} from "../repository";
import {IOrderService} from "./order.service.interface";
import {OrderDto} from "../dto/order.dto";
import {NewOrderInput} from "../input/order.input";
import axios from "axios";
import {PickerOrderDto} from "../dto/picker.order.dto";
import {OrderRepository} from "../repository/order.repository";

@Injectable()
export class OrderService implements IOrderService{
    constructor(private repository: IOrderRepository) {}

    getAllOrders(): Promise<OrderDto[]> {
        return this.repository.getAllOrders()
    }

    async createOrder(input: NewOrderInput): Promise<OrderDto> {
        if(input.totalAmount <= 0) throw new PreconditionFailedException("The total amount must be greater that 0")
        let order = await this.repository.createOrder(input)
        await this.addPickerOrders(order)
        return order
    }

    async getAllReadyToShip(): Promise<OrderDto[]> {
        let orders: OrderDto[] = await this.getAllOrders()
        const pickerOrders: PickerOrderDto[] = await this.getPickerOrders();
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
    private filterByReadyToShipPicker(orders: PickerOrderDto[]): PickerOrderDto[] {
        return orders.filter(
            order => order.status == "READY_TO_SHIP"
        )
    }

    private async getPickerOrders() {
        return axios.get(`http://localhost:3000/api/picker/order/get_all_orders`)
            .then(response => {
                // Process the response data
                return response.data
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    }

    private async addPickerOrders(order: OrderDto) {
        return axios.post(`http://localhost:3000/api/picker/order/add_order`, {
            id: order.id,
            orderStatus: order.status,
            items: [
                {
                    productId : 1,
                    name: "Item 1",
                    price: 1000.0,
                    quantity: 10
                }
            ]
        })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    }

    private pickerHasTheSameReadyToShipOrders(pickerOrders: PickerOrderDto[], orders: OrderDto[]) {
        return this.filterByReadyToShipPicker(pickerOrders).length == this.filterByReadyToShip(orders).length
            && pickerOrders.length == orders.length
    }

    private async orderEqualsPickerOrder(order: OrderDto, pickerOrder: PickerOrderDto){
        if (order.id == pickerOrder.orderId && order.status != pickerOrder.status){
            if(pickerOrder.status == "READY_TO_SHIP" && order.status == "NOT_STARTED"){
                await this.repository.updateOrderStatus(order.id, "READY_TO_SHIP")
            }
        }
    }
}
