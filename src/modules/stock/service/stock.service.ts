import {Injectable} from "@nestjs/common";
import {IStockService} from "./stock.service.interface";
import {StockDto} from "../dto";
import {IStockRepository} from "../repository";
import {PickerService} from "../../picker/service/picker.service";
import {IOrderService} from "../../order/service";
import {PickerStockDto} from "../dto/picker.stock.dto";
import {IProductService} from "../../product/service";

@Injectable()
export class StockService implements IStockService {
    constructor(
        private repository: IStockRepository,
        private pickerService: PickerService,
        private productService: IProductService,
        private orderService: IOrderService) {}

    async getAllItemsInStock(): Promise<StockDto[]> {
        const pickerStock : PickerStockDto[] = await this.pickerService.getPickerStock()
        const notStartedOrders = await this.getNotStartedOrders()
        // Iterate through not started orders
        for (const order of notStartedOrders) {
            // Iterate through products in the order
            for (const product of order.products) {
                // Find the corresponding item in picker's stock
                const productDto = await this.productService.getById(product.productId)
                const itemInStockIndex = pickerStock.findIndex(stock => stock.itemName === productDto.name);
                // If item found, decrement the quantity
                if (itemInStockIndex !== -1) {
                    pickerStock[itemInStockIndex].quantity -= product.quantity;
                }
            }
        }
        return pickerStock
    }

    getStockById(id: number): Promise<StockDto> {
        return this.repository.getStockById(id)
    }

    private async getReadyToShipPickerOrders(){
        const pickerOrders = await this.pickerService.getPickerOrders()
        return this.pickerService.filterByReadyToShipPicker(pickerOrders)
    }

    private async getNotStartedOrders(){
        const orders = await this.orderService.getAllOrdersWProducts()
        return orders.filter(
            order => order.status == "NOT_STARTED"
        )
    }
}
