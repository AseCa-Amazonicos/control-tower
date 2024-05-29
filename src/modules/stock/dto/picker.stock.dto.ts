export class PickerStockDto {
    productId: number;
    quantity: number;

    constructor(pickerStockDto: PickerStockDto) {
        this.productId = pickerStockDto.productId;
        this.quantity = pickerStockDto.quantity;
    }
}
