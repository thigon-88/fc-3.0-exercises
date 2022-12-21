import Customer from "../entity/customer";
import OrderItem from "../entity/order_item";
import { v4 as uuid } from "uuid";
import Order from "../entity/order";

export default class OrderService {

    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {

        if(items.length === 0) {
            throw new Error("Items are required.");
        }

        const order = new Order(uuid(), customer.id, items);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }
}