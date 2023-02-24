import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {

    eventData: any;
    dataTimeOcurred: Date;

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}