import {Injectable} from "@nestjs/common";
import axios from "axios";
import {OrderDto, PickerOrderDto} from "../../order/dto";
import {IProductService} from "../../product/service";
import {ProductOrderInput} from "../../order/input/product.order.input";
import {ItemInput} from "../input/item.input";
import {PickerStockDto} from "../../stock/dto/picker.stock.dto";

export abstract class IPickerService{

    abstract getPickerOrders()

    abstract addPickerOrders(order: OrderDto, products: ProductOrderInput[])

    abstract getPickerStock()
}
