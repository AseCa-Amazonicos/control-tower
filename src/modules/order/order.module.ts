import {forwardRef, Module} from "@nestjs/common";
import {OrderController} from "./order.controller";
import {IOrderService, OrderService} from "./service";
import {OrderRepository} from "./repository/order.repository";
import {IOrderRepository} from "./repository";
import {PickerModule} from "../picker/picker.module";
import {StockModule} from "../stock/stock.module";

const orderServiceProvider = {
    provide: IOrderService,
    useClass: OrderService,
};

const orderRepositoryProvider = {
    provide: IOrderRepository,
    useClass: OrderRepository,
};

@Module({
    controllers: [OrderController],
    providers: [orderServiceProvider, orderRepositoryProvider],
    imports: [PickerModule, forwardRef(() => StockModule)],
    exports: [orderServiceProvider]
})

export class OrderModule {}
