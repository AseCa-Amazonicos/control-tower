import {Controller, ForbiddenException, Get, Param} from "@nestjs/common";
import {IStockService} from "./service";
import {StockDto} from "./dto";

@Controller('stock')
export class StockController {
    constructor(private stockService: IStockService) {}

    @Get()
    async findAll(): Promise<StockDto[]> {
        return this.stockService.getAllItemsInStock()
    }
}
