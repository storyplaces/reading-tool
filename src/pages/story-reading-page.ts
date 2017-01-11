/**
 * Created by andy on 28/11/16.
 */
import {autoinject} from "aurelia-framework";
import {ReadingManager} from "../resources/reading/ReadingManager";

@autoinject()
export class StoryReadingPage {

    storyId: string;
    readingId: string;

    constructor(private readingManager: ReadingManager) {
    }

    activate(params) {
        this.storyId = params.storyId;
        this.readingId = params.readingId;
        return this.readingManager.attach(this.storyId, this.readingId);
    }

    deactivate() {
        this.storyId = undefined;
        return this.readingManager.detach();
    }
}