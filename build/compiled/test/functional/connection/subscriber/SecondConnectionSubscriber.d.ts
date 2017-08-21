import { EntitySubscriberInterface } from "../../../../src/subscriber/EntitySubscriberInterface";
import { InsertEvent } from "../../../../src/subscriber/event/InsertEvent";
export declare class SecondConnectionSubscriber implements EntitySubscriberInterface<any> {
    /**
     * Called after entity insertion.
     */
    beforeInsert(event: InsertEvent<any>): void;
}
