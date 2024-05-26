import {Body, Controller, ForbiddenException, Get, HttpCode, Param, Post, Request} from "@nestjs/common";
import {Request as ExpressRequest} from 'express';
import {NewProductInput} from "./input";
import {ProductDto} from "./dto";
import {IProductService} from "./service";

@Controller('product')
export class ProductController {
    constructor(private service: IProductService) {}

    @Get()
    async findAll(): Promise<ProductDto[]> {
        return this.service.getAllProducts()
    }

    @Get(':id')
    async findById(@Request() req: ExpressRequest,
                   @Param() param: string): Promise<ProductDto> {
        const productId = parseInt(param['id']);
        if (Number.isNaN(productId)) {
            throw new ForbiddenException('Order id must be a number');
        } else {
            return this.service.getById(productId);
        }
    }

    @Post()
    @HttpCode(201)
    createOrder(@Request() req: ExpressRequest, @Body() input: NewProductInput): Promise<ProductDto> {
        return this.service.createProduct(input)
    }
}
