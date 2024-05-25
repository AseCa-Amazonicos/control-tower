import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../../prisma";
import {IStockRepository} from "./stock.repository.interface";
import {NewStockInput} from "../input/stock.input";
import {StockDto} from "../dto";

@Injectable()
export class StockRepository implements IStockRepository {
    constructor(private prisma: PrismaService) {
    }

    addStock(input: NewStockInput): Promise<StockDto> {
        return this.prisma.stock.create({
            data: {
                name: input.name,
                price: input.price,
                quantity: input.quantity
            }
        })
    }

    getAllItemsInStock(): Promise<StockDto[]> {
        return this.prisma.stock.findMany();
    }

    getStockById(id: number): Promise<StockDto> {
        return this.prisma.stock.findUnique({
                where: {
                    id: id
                }
            }
        )
    }

}
