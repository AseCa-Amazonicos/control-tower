export class ProductInOrderDto{
    orderId: number
    productId: number
    quantity: number
    constructor(productInOrder: ProductInOrderDto) {
        this.orderId = productInOrder.orderId
        this.productId = productInOrder.productId
        this.quantity = productInOrder.quantity
    }
}
