import {Module} from "@nestjs/common";
import {IProductService, ProductService} from "./service";
import {IProductRepository, ProductRepository} from "./repository";
import {ProductController} from "./product.controller";

const productServiceProvider = {
    provide: IProductService,
    useClass: ProductService,
};

const productRepositoryProvider = {
    provide: IProductRepository,
    useClass: ProductRepository,
};

@Module({
    controllers: [ProductController],
    providers: [productServiceProvider, productRepositoryProvider],
    exports: [productServiceProvider]
})

export class ProductModule {}
