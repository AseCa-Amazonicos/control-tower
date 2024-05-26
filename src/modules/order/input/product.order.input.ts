import {IsNotEmpty, IsNumber} from 'class-validator';

export class ProductOrderInput {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
