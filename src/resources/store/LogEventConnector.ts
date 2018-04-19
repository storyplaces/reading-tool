import {inject, NewInstance} from "aurelia-framework";
import {LogEvent} from "../models/LogEvent";
import {LocalStore} from "./LocalStore";
import moment = require('moment');
import {LogEventAPI} from "./LogEventAPI";
/**
 * Created by andy on 09/12/16.
 */

@inject(NewInstance.of(LogEventAPI), LocalStore)
export class LogEventConnector {

    private toBeSaved: Array<LogEvent>;

    constructor(private logEventAPI: LogEventAPI, private localStore: LocalStore) {
        this.logEventAPI.path = "/logevent/";
        this.toBeSaved = [];
    }

    get all(): Array<LogEvent> {
        return this.toBeSaved;
    }

    save(object: LogEvent): Promise<void> {
        this.toBeSaved.push(object);
        let sequence = Promise.resolve();
        this.toBeSaved.forEach((logEvent) => {
            sequence = sequence.then(() => {
                return this.logEventAPI.saveLogEvent(logEvent).then(response => {
                    this.removeFromToBeSaved(logEvent);
                })
                    .catch(()=>{});
            });
        });
        return sequence;
    }

    private removeFromToBeSaved(object: LogEvent) {
        this.toBeSaved = this.toBeSaved.filter(logEvent => logEvent !== object);
    }

}