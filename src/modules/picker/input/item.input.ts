export class ItemInput{
    productId: number
    name: string
    price: number
    quantity: number
    constructor(itemInput: ItemInput) {
        this.productId = itemInput.productId
        this.name = itemInput.name
        this.price = itemInput.price
        this.quantity = itemInput.quantity
    }
}
