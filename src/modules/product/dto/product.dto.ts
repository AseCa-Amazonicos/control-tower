export class ProductDto {
    id:      number
    name:    string
    price:   number
    constructor(productDto: ProductDto) {
        this.id = productDto.id
        this.name = productDto.name
        this.price = productDto.price
    }
}
