/**
 * Created by andy on 13/01/17.
 */
import {inject, Factory} from "aurelia-framework";
import {LogEventConnector} from "../store/LogEventConnector";
import {LogEvent} from "../models/LogEvent";
import {Authenticator} from "../auth/Authenticator";

import moment = require('moment');

@inject(
    LogEventConnector,
    Authenticator,
    Factory.of(LogEvent)
)
export class LoggingHelper {

    constructor(private logEventConnector: LogEventConnector,
                private authenticator: Authenticator,
                private logEventFactory: (any?) => LogEvent) {

    }

    createNewLogEvent(type: string, data: Object): LogEvent {
        let logEvent = {
            type: type,
            data: data,
            date: moment().toJSON(),
            user: this.authenticator.userId
        }
        return this.logEventFactory(logEvent);
    }

    logNewReading(storyId: string) {
        let event = this.createNewLogEvent("NewReading", {storyId: storyId});
        this.logEventConnector.save(event);
    }

    logViewReading(storyId: string, readingId: string) {
        let event = this.createNewLogEvent("ViewReading", {storyId: storyId, readingId: readingId});
        this.logEventConnector.save(event);
    }

    logPageRead(storyId: string, readingId: string, pageId: string, pageName: string) {
        let event = this.createNewLogEvent("PageRead", {
            storyId: storyId,
            readingId: readingId,
            pageId: pageId,
            pageName: pageName
        });
        this.logEventConnector.save(event);
    }

    logViewStory(storyId: string) {
        let event = this.createNewLogEvent("ViewStory", {storyId: storyId});
        this.logEventConnector.save(event);
    }

    logChangeVariable(storyId: string, readingId: string, variableName: string, variableValue: string) {
        let event = this.createNewLogEvent("ChangeVariable", {
            storyId: storyId,
            readingId: readingId,
            variableName: variableName,
            variableValue: variableValue
        });
        this.logEventConnector.save(event);
    }


}