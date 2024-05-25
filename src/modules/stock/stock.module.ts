import {Module} from "@nestjs/common";
import {IStockService, StockService} from "./service";
import {StockController} from "./stock.controller";
import {IStockRepository, StockRepository} from "./repository";

const stockServiceProvider = {
    provide: IStockService,
    useClass: StockService,
};

const stockRepositoryProvider = {
    provide: IStockRepository,
    useClass: StockRepository,
};

@Module({
    controllers: [StockController],
    providers: [stockServiceProvider, stockRepositoryProvider],
})

export class StockModule {}
