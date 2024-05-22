import {Module} from "@nestjs/common";
import {OrderController} from "./order.controller";
import {IOrderService, OrderService} from "./service";
import {OrderRepository} from "./repository/order.repository";
import {IOrderRepository} from "./repository";

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
})

export class OrderModule {}
