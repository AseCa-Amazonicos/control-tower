import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class NewOrderInput {
    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    totalAmount: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    mail: string;
}
