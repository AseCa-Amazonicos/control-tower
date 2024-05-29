import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: process.env.NODE_ENV === 'test'
                        ? config.get("TEST_DATABASE_URL")
                        : config.get("DATABASE_URL"),
                },
            },
        });
    }
}
