import Product from "./product";

describe("Product unit tests", () => {

    it("Should throw an error when id is empty", () => {
        
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrowError("Id is required.");
    });

    it("Should throw an error when name is empty", () => {
        
        expect(() => {
            const product = new Product("p1", "", 100);
        }).toThrowError("Name is required.");
    });

    it("Should throw an error when price is lower than 0", () => {
        
        expect(() => {
            const product = new Product("p1", "Product 1", -1);
        }).toThrowError("Price must be equal or greater than 0.");
    });

    it("Should change name", () => {
        
        const product = new Product("p1", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("Should change price", () => {
        
        const product = new Product("p1", "Product 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });
});