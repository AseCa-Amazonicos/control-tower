import {IProductRepository} from "../../../src/modules/product/repository";
import {NewProductInput} from "../../../src/modules/product/input";
import {ProductDto} from "../../../src/modules/product/dto";

export class MockProductRepository implements IProductRepository {
    products: ProductDto[] = []
    id = 1
    createProduct(input: NewProductInput): Promise<ProductDto> {
        const productDto: ProductDto = this.getProductDto(input)
        this.products.push(productDto)
        return Promise.resolve(productDto);
    }

    getAllProducts(): Promise<ProductDto[]> {
        return Promise.resolve(this.products);
    }

    getById(id: number): Promise<ProductDto> {
        return Promise.resolve(this.products.filter(
            product => product.id === id
        )[0]);
    }

    private getProductDto(input: NewProductInput): ProductDto {
        return {
            id: this.id++,
            name: input.name,
            price: input.price
        }
    }
}
