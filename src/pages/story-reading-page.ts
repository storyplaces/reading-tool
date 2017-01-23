/**
 * Created by andy on 28/11/16.
 */
import {autoinject} from "aurelia-framework";
import {ReadingManager} from "../resources/reading/ReadingManager";
import {LoggingHelper} from "../resources/logging/LoggingHelper";
import {LocationManager} from "../resources/gps/LocationManager";

@autoinject()
export class StoryReadingPage {

    storyId: string;
    readingId: string;

    pageList: HTMLDivElement;

    showUpArrow: boolean = false;
    showDownArrow: boolean = false;

    constructor(private readingManager: ReadingManager,
                private loggingHelper: LoggingHelper,
                private location: LocationManager) {
    }

    activate(params) {
        this.storyId = params.storyId;
        this.readingId = params.readingId;
        this.loggingHelper.logViewReading(this.storyId, this.readingId);
        return this.readingManager.attach(this.storyId, this.readingId);
    }

    attached() {
        this.pageList.onscroll = (event) => { this.caclulateArrows();}
        this.caclulateArrows();
    }

    caclulateArrows() {
        this.showUpArrow = (this.pageList.scrollTop != 0);
        this.showDownArrow = (this.pageList.scrollTop < this.pageList.scrollHeight - this.pageList.offsetHeight);
    }

    detatched() {
        this.storyId = undefined;
        return this.readingManager.detach();
    }
}