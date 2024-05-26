import {Module} from "@nestjs/common";
import {IStockService, StockService} from "./service";
import {StockController} from "./stock.controller";
import {IStockRepository, StockRepository} from "./repository";
import {PickerModule} from "../picker/picker.module";
import {OrderModule} from "../order";
import {ProductModule} from "../product/product.module";

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
    imports: [PickerModule, OrderModule, ProductModule]
})

export class StockModule {}
