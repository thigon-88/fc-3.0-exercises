import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("Should throw an error when id is empty", () => {
        
        expect(() => {
            let customer = new Customer("", "Wesley");
        }).toThrowError("Id is required.");
    });

    it("Should throw an error when name is empty", () => {
        
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required.");
    });

    it("Should change name", () => {
        
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("Should activate customer", () => {
        
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "13300-250", "São Paulo");
        customer.changeAddress(address);
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("Should deactivate customer", () => {
        
        const customer = new Customer("1", "Customer 1");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("Should throw error when address is undefined when you activate a customer", () => {
        
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer.");
    });

    it("Should add reward points", () => {

        const customer = new Customer("c1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});