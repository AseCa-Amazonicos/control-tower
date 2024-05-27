import {Module} from "@nestjs/common";
import {IStockService, StockService} from "./service";
import {StockController} from "./stock.controller";
import {PickerModule} from "../picker/picker.module";
import {OrderModule} from "../order";
import {ProductModule} from "../product/product.module";

const stockServiceProvider = {
    provide: IStockService,
    useClass: StockService,
};
@Module({
    controllers: [StockController],
    providers: [stockServiceProvider],
    imports: [PickerModule, OrderModule, ProductModule]
})

export class StockModule {}
