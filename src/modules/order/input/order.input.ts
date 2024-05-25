import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import {OrderStatus} from '@prisma/client';

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
}

