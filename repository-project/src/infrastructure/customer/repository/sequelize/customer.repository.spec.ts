import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer Repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "00050-604", "Cipotanea");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: {id: "c1"} });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });
    });

    it("Should update a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "00050-604", "Cipotanea");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        customer.changeName("Customer 2");

        await customerRepository.update(customer);
        const productModel = await CustomerModel.findOne({ where: {id: "c1"} });

        expect(productModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });
    });

    it("Should find a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "00050-604", "Cipotanea");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: {id: "c1"} });
        const foundCustomer = await customerRepository.find("c1");

        expect(customerModel.toJSON()).toStrictEqual({
            id: foundCustomer.id,
            name: foundCustomer.name,
            street: foundCustomer.address.street,
            number: foundCustomer.address.number,
            zip: foundCustomer.address.zip,
            city: foundCustomer.address.city,
            active: foundCustomer.isActive(),
            rewardPoints: foundCustomer.rewardPoints
        });
    });

    it("Should throw an error when customer is not found", async() => {

        const customerRepository = new CustomerRepository();

        expect(async() => {
            await customerRepository.find("2323");
        }).rejects.toThrow("Customer not found");
    });

    it("Should find all customers", async() => {

        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("c1", "Customer 1");
        const address1 = new Address("Street 1", 123, "00050-604", "Cipotanea");
        customer1.changeAddress(address1);
        customer1.addRewardPoints(10);
        const customer2 = new Customer("c2", "Customer 2");
        const address2 = new Address("Street 2", 123, "00060-504", "Pereira");
        customer2.changeAddress(address2);
        customer2.addRewardPoints(20);
        const customers = [customer1, customer2];        

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();
        
        expect(customers).toEqual(foundCustomers);
    });
});