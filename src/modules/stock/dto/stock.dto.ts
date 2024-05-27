export class StockDto {
    productId: number;
    itemName: string;
    quantity: number;

    constructor(stockDto: StockDto) {
        this.productId = stockDto.productId;
        this.itemName = stockDto.itemName;
        this.quantity = stockDto.quantity;
    }
}
