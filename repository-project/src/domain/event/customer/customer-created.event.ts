import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {

    eventData: any;
    dataTimeOcurred: Date;

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}