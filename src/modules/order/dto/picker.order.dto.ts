export class PickerOrderDto {
    orderId:          number
    status:      string
    constructor(orderDto: PickerOrderDto) {
        this.orderId = orderDto.orderId
        this.status = orderDto.status
    }
}
