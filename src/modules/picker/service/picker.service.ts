import {Injectable, PreconditionFailedException} from "@nestjs/common";
import axios from "axios";
import {PickerOrderDto} from "../../order/dto/picker.order.dto";
import {OrderDto} from "../../order/dto/order.dto";

@Injectable()
export class PickerService {

    filterByReadyToShipPicker(orders: PickerOrderDto[]): PickerOrderDto[] {
        return orders.filter(
            order => order.status == "READY_TO_SHIP"
        )
    }

    async getPickerOrders() {
        return axios.get(`http://localhost:3000/api/picker/order/get_all_orders`)
            .then(response => {
                // Process the response data
                return response.data
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    }

    async addPickerOrders(order: OrderDto) {
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

    async getPickerStock() {
        return axios.get(`http://localhost:3000/api/picker/stock/get_actual_stock`)
            .then(response => {
                // Process the response data
                return response.data
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    }
}
