import {Injectable} from "@nestjs/common";
import axios from "axios";
import {OrderDto, PickerOrderDto} from "../../order/dto";
import {IProductService} from "../../product/service";
import {ProductOrderInput} from "../../order/input/product.order.input";
import {ItemInput} from "../input/item.input";

@Injectable()
export class PickerService {
    constructor(private productService: IProductService) {}

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

    async addPickerOrders(order: OrderDto, products: ProductOrderInput[]) {
        let items : ItemInput[] = await this.getItems(products)
        return axios.post(`http://localhost:3000/api/picker/order/add_order`, {
            id: order.id,
            orderStatus: order.status,
            items: items
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

    private async getItems(products: ProductOrderInput[]): Promise<ItemInput[]> {
        const items: Promise<ItemInput>[] = products.map(
            product => this.getItem(product)
        );
        return Promise.all(items);
    }

    private async getItem(productOrderInput: ProductOrderInput): Promise<ItemInput> {
        let product = await this.productService.getById(productOrderInput.productId)
        return {
            productId: productOrderInput.productId,
            name: product.name,
            price: product.price,
            quantity: productOrderInput.quantity
        }
    }
}
