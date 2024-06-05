import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {IStockService} from "./stock.service.interface";
import {StockDto} from "../dto";
import {PickerService} from "../../picker/service/picker.service";
import {IOrderService} from "../../order/service";
import {PickerStockDto} from "../dto/picker.stock.dto";
import {IProductService} from "../../product/service";
import {OrderWithProductsDto, ProductInOrderDto} from "../../order/dto";
import {ProductDto} from "../../product/dto";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import {NewProductInput} from "../../product/input";

@Injectable()
export class StockService implements IStockService {
    constructor(
        private pickerService: PickerService,
        private productService: IProductService,
        @Inject(forwardRef(() => IOrderService))
        private orderService: IOrderService) {}

    async getAllItemsInStock(): Promise<StockDto[]> {
        const pickerStock: PickerStockDto[] = await this.pickerService.getPickerStock();
        const notStartedOrders: OrderWithProductsDto[] = await this.getNotStartedOrders();
        let stockWProductName = await this.getStockWProductName(pickerStock);
        console.log(stockWProductName)
        for (const order of notStartedOrders) {
            for (const product of order.products) {
                stockWProductName = await this.updateStockQty(product, stockWProductName)
            }
        }

        return stockWProductName;
    }


    private async getNotStartedOrders(){
        const orders = await this.orderService.getAllOrdersWProducts()
        return orders.filter(
            order => order.status == "NOT_STARTED"
        )
    }

    private async getStockWProductName(pickerStock: PickerStockDto[]){
        let stockWProductId: StockDto[] = [];
        for (const stock of pickerStock) {
            let product = await this.productService.getById(stock.productId)
            stockWProductId.push(this.getStockDto(stock, product))
        }
        return stockWProductId
    }

    private getStockDto(stock: PickerStockDto, productDto: ProductDto): StockDto {
        return {
            itemName: productDto.name,
            quantity: stock.quantity,
            productId: stock.productId
        };
    }

    private async updateStockQty(product: ProductInOrderDto, stock: StockDto[]) {
        const productDto = await this.getProductById(product);
        const index = this.getProductInStock(productDto, stock);

        if (index !== -1) {
            stock[index].quantity -= product.quantity;
        }

        return stock
    }

    private async getProductById(product: ProductInOrderDto){
        return await this.productService.getById(product.productId)
    }

    private getProductInStock(productDto: ProductDto, stockWProductId: StockDto[]){
        return stockWProductId.findIndex(stock => stock.itemName === productDto.name)
    }
}
