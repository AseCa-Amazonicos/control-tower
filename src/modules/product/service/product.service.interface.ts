import {NewProductInput} from "../input";
import {ProductDto} from "../dto";

export abstract class IProductService{
    abstract createProduct(input: NewProductInput): Promise<ProductDto>

    abstract getAllProducts(): Promise<ProductDto[]>

    abstract getById(id: number): Promise<ProductDto>
}
