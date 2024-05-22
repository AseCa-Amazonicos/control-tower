export class OrderDto {
    id:          number
    status:      string
    createdAt:   Date
    totalAmount: number
    userId:      number
    mail:        string
    constructor(orderDto: OrderDto) {
        this.id = orderDto.id
        this.status = orderDto.status
        this.createdAt = orderDto.createdAt
        this.totalAmount = orderDto.totalAmount
        this.userId = orderDto.userId
        this.mail = orderDto.mail
    }
}
