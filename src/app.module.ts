import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {PrismaModule} from "./prisma";
import {OrderModule} from "./modules/order";
import {PickerModule} from "./modules/picker/picker.module";
import {StockModule} from "./modules/stock/stock.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        OrderModule,
        StockModule,
        PickerModule
    ]
})

export class AppModule {}
