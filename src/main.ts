import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {CallPickerService} from "./picker/CallPickerService";

const pickerService = new CallPickerService();
const rangeInMS = 10000; // 10 seconds

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    SwaggerModule.setup(
        'docs',
        app,
        SwaggerModule.createDocument(
            app,
            new DocumentBuilder()
                .setTitle('EventBuddy API')
                .setExternalDoc('Postman', '/docs-json')
                .build(),
        ),
    );

    const config = app.get(ConfigService);
    const port = config.get('PORT');

    await app.listen(port);
    return port;
}

bootstrap().then((port) => {
        Logger.log(`NestJS server listening at port ${port}`, 'Bootstrap')
        pickerService.startPeriodicCalls(rangeInMS, "order/get_all_orders")
        pickerService.startPeriodicCalls(rangeInMS, "stock/get_actual_stock")
    }
);
