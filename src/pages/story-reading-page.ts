/**
 * Created by andy on 28/11/16.
 */
import {StoryConnector} from "../resources/store/StoryConnector";
import {autoinject, computedFrom} from "aurelia-framework";
import {Story} from "../resources/models/Story";
import {Page} from "../resources/models/Page";
import {ReadingConnector} from "../resources/store/ReadingConnector";
import {Reading} from "../resources/models/Reading";

@autoinject()
export class StoryReadingPage {

    storyId: string;
    readingId: string;

    constructor(private storyConnector: StoryConnector, private readingConnector: ReadingConnector) {
    }

    @computedFrom('storyConnector.all', 'storyId')
    get story(): Story {
        return this.storyConnector.byId(this.storyId);
    }

    @computedFrom('readingConnector.all', 'readingId')
    get reading(): Reading {
        return this.readingConnector.byId(this.readingId);
    }

    @computedFrom('story', 'reading')
    get viewablePages(): Array<Page> {
        return this.story.pages.toArray().filter((page) => {
            return page.isViewable;
        });
    }

    activate(params) {
        this.storyId = params.storyId;
        this.readingId = params.readingId;

        if (this.story === undefined) {
            return this.storyConnector.fetchById(params.storyId);
        }
        if (this.reading === undefined) {
            this.readingConnector.fetchById(params.readingId);
        }

        this.story.pages.forEach((page) => {
            page.updateViewable(this.reading.variables, this.story.conditions);
        })
    }

    deactivate() {
        this.storyId = undefined;
    }


}