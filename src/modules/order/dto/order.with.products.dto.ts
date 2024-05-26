import {OrderDto} from "./order.dto";
import {ProductInOrderDto} from "./product.in.order.dto";

export class OrderWithProductsDto extends OrderDto{
    products: ProductInOrderDto[]
    constructor(order : OrderWithProductsDto) {
        super(order);
        this.products = order.products
    }
}
