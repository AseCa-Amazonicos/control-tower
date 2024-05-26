import {Module} from "@nestjs/common";
import {OrderController} from "./order.controller";
import {IOrderService, OrderService} from "./service";
import {OrderRepository} from "./repository/order.repository";
import {IOrderRepository} from "./repository";
import {PickerModule} from "../picker/picker.module";

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
    imports: [PickerModule],
    exports: [orderServiceProvider]
})

export class OrderModule {}
