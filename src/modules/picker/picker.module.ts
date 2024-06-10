import {Module} from "@nestjs/common";
import {PickerService} from "./service/picker.service";
import {ProductModule} from "../product/product.module";
import {IPickerService} from "./service/picker.interface.service";

const pickerServiceProvider = {
    provide: IPickerService,
    useClass: PickerService,
};

@Module({
    providers: [pickerServiceProvider],
    exports: [pickerServiceProvider],
    imports: [ProductModule]
})

export class PickerModule {}
