import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {PrismaModule} from "./prisma";
import {OrderModule} from "./modules/order";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        OrderModule,
    ]
})

export class AppModule {}
