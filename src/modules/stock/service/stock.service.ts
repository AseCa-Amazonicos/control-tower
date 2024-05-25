import {Injectable} from "@nestjs/common";
import {IStockService} from "./stock.service.interface";
import {NewStockInput} from "../input/stock.input";
import {StockDto} from "../dto/stock.dto";

@Injectable()
export class StockService implements IStockService {
    addStock(input: NewStockInput): Promise<StockDto> {
        return Promise.resolve(undefined);
    }

    getAllItemsInStock(): Promise<StockDto[]> {
        return Promise.resolve([]);
    }

    getStockById(id: number): Promise<StockDto> {
        return Promise.resolve(undefined);
    }

}
