import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MessageService {
    constructor() {}

    message: BehaviorSubject<{message: any, key: string}> = new BehaviorSubject({message: null, key: ''});

    /**
     * **BROADCAST DATA WITH KEY**
     * @description Take params and broadcast it for other components
     * @param key string
     * @param message any
     */
    setMessage(key: string, message: any) {
        this.message.next({
            key: key,
            message: message
        });
    }
}