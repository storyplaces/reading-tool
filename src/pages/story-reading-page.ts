/**
 * Created by andy on 28/11/16.
 */
import {autoinject} from "aurelia-framework";
import {ReadingManager} from "../resources/reading/ReadingManager";
import {LoggingHelper} from "../resources/logging/LoggingHelper";

@autoinject()
export class StoryReadingPage {

    storyId: string;
    readingId: string;

    constructor(private readingManager: ReadingManager,
                private loggingHelper: LoggingHelper) {
    }

    activate(params) {
        this.storyId = params.storyId;
        this.readingId = params.readingId;
        this.loggingHelper.logViewReading(this.storyId, this.readingId);
        return this.readingManager.attach(this.storyId, this.readingId);
    }

    deactivate() {
        this.storyId = undefined;
        return this.readingManager.detach();
    }
}