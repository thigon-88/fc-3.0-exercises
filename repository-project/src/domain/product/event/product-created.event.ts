import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {

    eventData: any;
    dataTimeOcurred: Date;
   
    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}