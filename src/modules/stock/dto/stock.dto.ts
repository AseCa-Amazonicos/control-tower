export class StockDto {
    id: number;
    itemName: string;
    quantity: number;

    constructor(stockDto: StockDto) {
        this.id = stockDto.id;
        this.itemName = stockDto.itemName;
        this.quantity = stockDto.quantity;
    }
}
