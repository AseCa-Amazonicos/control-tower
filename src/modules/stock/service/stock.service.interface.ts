import {StockDto} from "../dto/stock.dto";
import {NewStockInput} from "../input/stock.input";

export abstract class IStockService {
    abstract getAllItemsInStock() : Promise<StockDto[]>
    abstract addStock(input: NewStockInput): Promise<StockDto>
    abstract getStockById(id: number): Promise<StockDto>
}
