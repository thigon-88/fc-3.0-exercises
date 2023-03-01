import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import OrderModel from "./order.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import Order from "../../../../domain/checkout/entity/order";

describe("Order Repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it("Should create a new order", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "00095-409", "Belo Horizonte");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 10);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();        
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("o1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId
                }
            ]
        });
    });

    it("Should update an order", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "00095-409", "Belo Horizonte");
        customer.changeAddress(address);
        const customer2 = new Customer("c2", "Customer 2");
        const address2 = new Address("Street 2", 456, "00056-381", "Arraial");
        customer2.changeAddress(address2);
        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 10);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();        
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("o1", customer.id, [orderItem]);
        await orderRepository.create(order);

        order.changeCustomerId(customer2.id);
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer2.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId
                }
            ]
        });
    });

    it("Should find an order", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "00095-409", "Belo Horizonte");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "Product 1", 10);
        const product2 = new Product("p2", "Product 2", 20);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderRepository = new OrderRepository();        
        const orderItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 2);
        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 3);
        const order = new Order("o1", customer.id, [orderItem1, orderItem2]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });
        const foundOrder = await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerId,
            total: foundOrder.total(),
            items: [
                {
                    id: orderItem1.id,
                    name: orderItem1.name,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity,
                    order_id: order.id,
                    product_id: orderItem1.productId
                }, 
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: orderItem2.productId
                }
            ]
        });
    });

    it("Should throw an error when order is not found", async() => {

        const orderRepository = new OrderRepository();  

        expect(async() => {
            await orderRepository.find("336");
        }).rejects.toThrow("Order not found");
    });

    it("Should find all orders", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 123, "00095-409", "Belo Horizonte");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "Product 1", 10);
        const product2 = new Product("p2", "Product 2", 20);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderRepository = new OrderRepository();        
        const orderItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 2);
        const order1 = new Order("o1", customer.id, [orderItem1]);
        await orderRepository.create(order1);
        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 3);
        const order2 = new Order("o2", customer.id, [orderItem2]);
        await orderRepository.create(order2);
        const orders = [order1, order2];

        const foundOrders = await orderRepository.findAll();

        expect(orders).toEqual(foundOrders);
    });
});