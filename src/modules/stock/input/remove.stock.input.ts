import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class RemoveStockInput {
    @IsNotEmpty()
    @IsNumber()
    productId: Number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
