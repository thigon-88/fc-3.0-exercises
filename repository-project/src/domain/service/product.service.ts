import Product from "../entity/product";

export default class ProductService {
    
    static increasePrice(products: Product[], percValue: number): void {
        products.forEach(product => {
            product.changePrice((product.price * percValue) / 100 + product.price);
        });
    }
}