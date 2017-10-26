/**
 * Created by andy on 13/01/17.
 */
import {inject, Factory, BindingEngine} from "aurelia-framework";
import {LogEventConnector} from "../store/LogEventConnector";
import {LogEvent} from "../models/LogEvent";
import {Authenticator} from "../auth/Authenticator";

import moment = require('moment');
import {Story} from "../models/Story";
import {LocationInformation} from "../gps/LocationInformation";
import {LocationManager} from "../gps/LocationManager";
import {UserConfig} from "../store/UserConfig";

@inject(
    LogEventConnector,
    Authenticator,
    LocationManager,
    UserConfig,
    BindingEngine,
    Factory.of(LogEvent)
)
export class LoggingHelper {

    constructor(private logEventConnector: LogEventConnector,
                private authenticator: Authenticator,
                private locationManager: LocationManager,
                private userConfig: UserConfig,
                private bindingEngine: BindingEngine,
                private logEventFactory: (any?) => LogEvent) {
        this.bindingEngine.propertyObserver(this.userConfig, 'locationDemo').subscribe((state) => this.logDemoModeStateSet(state));
    }

    createNewLogEvent(type: string, data: Object): LogEvent {
        let logEvent = {
            type: type,
            data: data,
            date: moment().toJSON(),
            user: this.authenticator.userId
        };
        return this.logEventFactory(logEvent);
    }

    logNewReading(story: Story) {
        let location = this.getUserLocationIfAllowed(story);
        let event = this.createNewLogEvent("NewReading", {storyId: story.id, location: location});
        this.logEventConnector.save(event);
    }

    logViewReading(story: Story, readingId: string) {
        let location = this.getUserLocationIfAllowed(story);
        let event = this.createNewLogEvent("ViewReading", {storyId: story.id, readingId: readingId, location: location});
        this.logEventConnector.save(event);
    }

    logPageRead(story: Story, readingId: string, pageId: string, pageName: string) {
        let location = this.getUserLocationIfAllowed(story);
        let event = this.createNewLogEvent("PageRead", {
            storyId: story.id,
            readingId: readingId,
            pageId: pageId,
            pageName: pageName,
            location: location
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

    logDemoModeStateSet(state: boolean) {
        let event = this.createNewLogEvent("DemoModeEnabled", {
            state: state
        });
        this.logEventConnector.save(event);
    }

    getUserLocationIfAllowed(story: Story) : LocationInformation {
        //Only log a user location if the story is configured to log locations
        if (story.storyOptions.logLocations) {
            return this.locationManager.location;
        } else {
            return null;
        }
    }


}