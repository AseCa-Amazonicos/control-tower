import {Module} from "@nestjs/common";
import {PickerService} from "./service/picker.service";
import {ProductModule} from "../product/product.module";

@Module({
    providers: [PickerService],
    exports: [PickerService],
    imports: [ProductModule]
})

export class PickerModule {}
