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

    @Get(':id')
    getStockById(@Param('id') id: string){
        const stockId = parseInt(id);
        if (Number.isNaN(stockId)) {
            throw new ForbiddenException('Stock id must be a number');
        } else {
            return this.stockService.getStockById(stockId);
        }
    }
}
