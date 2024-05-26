import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import {OrderStatus} from '@prisma/client';
import {ProductOrderInput} from "./product.order.input";

export class NewOrderInput {
    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @IsNumber()
    @IsNotEmpty()
    totalAmount: number;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsArray()
    products: ProductOrderInput[]
}

