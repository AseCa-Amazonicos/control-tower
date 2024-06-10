import {MockProductRepository} from './util/mock.product.repository';
import {NewProductInput} from '../../src/modules/product/input';

describe('MockProductRepository', () => {
    let repository: MockProductRepository;

    beforeEach(() => {
        repository = new MockProductRepository();
    });

    it('should create product', async () => {
        const mockInput: NewProductInput = {
            name: 'Leche',
            price: 100,
        };
        const product = await repository.createProduct(mockInput);
        expect(repository.products).toContain(product);
    });

    it('should get all products', async () => {
        const products = await repository.getAllProducts();
        expect(products).toEqual(repository.products);
    });

    it('should return the correct product when given an id', async () => {
        const mockInput: NewProductInput = {
            name: 'Huevo',
            price: 10,
        };
        const product = await repository.createProduct(mockInput);
        const fetchedProduct = await repository.getById(product.id);
        expect(fetchedProduct).toEqual(product);
    });

    it('should create a product and then retrieve it using getAllProducts', async () => {
        const mockInput: NewProductInput = {
            name: 'Arroz',
            price: 150,
        };
        const product = await repository.createProduct(mockInput);
        const products = await repository.getAllProducts();
        expect(products).toContain(product);
    });

    it('should throw an error when creating a product with a negative price', async () => {
        const mockInput: NewProductInput = {
            name: 'Leche',
            price: -100,
        };
        await expect(repository.createProduct(mockInput)).rejects.toThrow(
            'Price cannot be negative'
        );
    });

    it('should return null when getting a product by an id that does not exist', async () => {
        const fetchedProduct = await repository.getById(999);
        expect(fetchedProduct).toBeNull();
    });

    it('should throw an error when creating a product without a name', async () => {
        const mockInput: NewProductInput = {
            name: '',
            price: 100,
        };
        await expect(repository.createProduct(mockInput)).rejects.toThrow(
            'Name cannot be empty'
        );
    });
});
