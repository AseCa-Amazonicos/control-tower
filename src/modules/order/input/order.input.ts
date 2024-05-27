import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import {OrderStatus} from '@prisma/client';
import {ProductOrderInput} from "./product.order.input";
import { Type } from 'class-transformer';

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
    @ValidateNested()
    @Type(()=>ProductOrderInput)
    products: ProductOrderInput[]
}

