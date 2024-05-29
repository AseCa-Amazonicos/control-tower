import {OrderStatus} from "@prisma/client";
import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class DeliveryOrderStatusDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status: OrderStatus
}
