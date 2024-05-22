import {INestApplication} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {OrderModule} from "../src/modules/order";
import {OrderService} from "../src/modules/order/service";

describe('Orders', () => {
    let app: INestApplication;
    let orderService = {findAll: () => ['test']};
    const request = require('supertest');
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [OrderModule],
        })
            .overrideProvider(OrderService)
            .useValue(orderService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET orders`, () => {
        return request(app.getHttpServer())
            .get('/orders')
            .expect(200)
            .expect({
                data: orderService.findAll(),
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
