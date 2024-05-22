export class OrderDto {
    id:          number
    status:      string
    createdAt:   Date
    totalAmount: number
    address:     string
    constructor(orderDto: OrderDto) {
        this.id = orderDto.id
        this.status = orderDto.status
        this.createdAt = orderDto.createdAt
        this.totalAmount = orderDto.totalAmount
        this.address = orderDto.address
    }
}
