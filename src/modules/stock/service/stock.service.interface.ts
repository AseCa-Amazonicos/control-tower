import {StockDto} from "../dto";

export abstract class IStockService {
    abstract getAllItemsInStock() : Promise<StockDto[]>
}
