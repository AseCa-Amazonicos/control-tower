import {Injectable} from "@nestjs/common";
import {IProductService} from "./product.service.interface";
import {NewProductInput} from "../input";
import {ProductDto} from "../dto";
import {IProductRepository} from "../repository";

@Injectable()
export class ProductService implements IProductService{
    constructor(private repository: IProductRepository) {}

    createProduct(input: NewProductInput): Promise<ProductDto> {
        return this.repository.createProduct(input);
    }
    getAllProducts(): Promise<ProductDto[]> {
        return this.repository.getAllProducts();
    }

    getById(id: number): Promise<ProductDto> {
        return this.repository.getById(id);
    }
}
