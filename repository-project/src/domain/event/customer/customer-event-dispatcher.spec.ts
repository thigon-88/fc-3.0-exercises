import Address from "../../entity/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendMessageWhenAddressChangedHandler from "./handler/send-message-when-address-changed.handler";
import SendMessage1WhenCustomerIsCreatedHandler from "./handler/send-message1-when-customer-is-created.handler";
import SendMessage2WhenCustomerIsCreatedHandler from "./handler/send-message2-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "../@shared/event-dispatcher";

describe("Customer Domain Event tests", () => {

    it("should notify message1 customer created handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessage1WhenCustomerIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();        
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "Customer1",
            name: "CustomerCreatedEvent"
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify message2 customer created handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessage2WhenCustomerIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();        
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "Customer1",
            name: "CustomerCreatedEvent"
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify when customer address change handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessageWhenAddressChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();        
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        const address = new Address("Street 1", 978, "98404-787", "Los Angeles");

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "Customer1",
            name: "Customer 1",
            address: address
        });

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});