import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class NewProductInput {
    @IsNotEmpty()
    @IsString()
    name:   string

    @IsNotEmpty()
    @IsNumber()
    price:  number
}

