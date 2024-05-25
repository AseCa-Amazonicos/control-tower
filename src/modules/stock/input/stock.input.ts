import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class NewStockInput {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
