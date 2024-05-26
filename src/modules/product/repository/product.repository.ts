import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../../prisma";
import {IProductRepository} from "./product.repository.interface";
import {NewProductInput} from "../input";
import {ProductDto} from "../dto";

@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(private prisma: PrismaService) {
    }

    createProduct(input: NewProductInput): Promise<ProductDto> {
        return this.prisma.product.create({
            data: {
                name: input.name,
                price: input.price,
            }
        })
    }

    getAllProducts(): Promise<ProductDto[]> {
        return this.prisma.product.findMany();
    }

    getById(id: number): Promise<ProductDto> {
        return this.prisma.product.findUnique({
            where:{
                id: id
            }
        });
    }
}
