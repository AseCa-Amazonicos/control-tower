export class StockDto {
    id: number;
    name: string;
    price: number;
    quantity: number;

    constructor(stockDto: StockDto) {
        this.id = stockDto.id;
        this.name = stockDto.name;
        this.price = stockDto.price;
        this.quantity = stockDto.quantity;
    }
}
