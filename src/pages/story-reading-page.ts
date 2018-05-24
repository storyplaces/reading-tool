/**
 * Created by andy on 28/11/16.
 */
import {autoinject} from "aurelia-framework";
import {ReadingManager} from "../resources/reading/ReadingManager";
import {LoggingHelper} from "../resources/logging/LoggingHelper";
import {LocationManager} from "../resources/gps/LocationManager";
import {StoryCollection} from "../resources/collections/StoryCollection";

@autoinject()
export class StoryReadingPage {

    storyId: string;
    readingId: string;

    pageList: HTMLDivElement;

    showUpArrow: boolean = false;
    showDownArrow: boolean = false;

    constructor(private readingManager: ReadingManager,
                private loggingHelper: LoggingHelper,
                private location: LocationManager,
                private storyCollection: StoryCollection) {
    }

    activate(params) {
        this.storyId = params.storyId;
        this.readingId = params.readingId;
        return this.readingManager
            .attach(this.storyId, this.readingId)
            .then(() => {
                this.loggingHelper.logViewReading(this.storyCollection.get(this.storyId), this.readingId);
            });
    }

    attached() {
        this.pageList.onscroll = (event) => {
            this.calculateArrows();
        }
        this.calculateArrows();
    }

    calculateArrows() {
        this.showUpArrow = (this.pageList.scrollTop != 0);
        this.showDownArrow = (this.pageList.scrollTop < this.pageList.scrollHeight - this.pageList.offsetHeight);
    }

    deactivate() {
        this.storyId = undefined;
        return this.readingManager.detach();
    }
}