export class PickerStockDto {
    id: number;
    itemName: string;
    quantity: number;

    constructor(pickerStockDto: PickerStockDto) {
        this.id = pickerStockDto.id;
        this.itemName = pickerStockDto.itemName;
        this.quantity = pickerStockDto.quantity;
    }
}
