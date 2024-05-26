import {StockDto} from "../dto";
import {NewStockInput} from "../input/stock.input";

export abstract class IStockRepository {
    abstract getAllItemsInStock(): Promise<StockDto[]>
    abstract addStock(input: NewStockInput): Promise<StockDto>
    abstract getStockById(id: number): Promise<StockDto>
}
