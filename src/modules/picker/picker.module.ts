import {Module} from "@nestjs/common";
import {PickerService} from "./service/picker.service";

@Module({
    providers: [PickerService],
    exports: [PickerService]
})

export class PickerModule {}
