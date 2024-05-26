import {ProductDto} from "../dto/product.dto";
import {NewProductInput} from "../input/new.product.input";

export abstract class IProductRepository{
    abstract getAllProducts() : Promise<ProductDto[]>

    abstract createProduct(input: NewProductInput): Promise<ProductDto>

    abstract getById(id: number): Promise<ProductDto>
}
