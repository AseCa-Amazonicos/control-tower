import {Injectable} from "@nestjs/common";
import {IStockService} from "./stock.service.interface";
import {NewStockInput} from "../input/stock.input";
import {StockDto} from "../dto";
import {IStockRepository} from "../repository";

@Injectable()
export class StockService implements IStockService {
    constructor(private repository: IStockRepository) {}

    addStock(input: NewStockInput): Promise<StockDto> {
        return this.repository.addStock(input)
    }

    getAllItemsInStock(): Promise<StockDto[]> {
        return this.repository.getAllItemsInStock();
    }

    getStockById(id: number): Promise<StockDto> {
        return this.repository.getStockById(id)
    }

}
