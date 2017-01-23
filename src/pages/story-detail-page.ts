/**
 * Created by andy on 28/11/16.
 */
import {StoryConnector} from "../resources/store/StoryConnector";
import {autoinject, computedFrom} from "aurelia-framework";
import {Story} from "../resources/models/Story";
import {LoggingHelper} from "../resources/logging/LoggingHelper";

@autoinject()
export class StoryDetailPage {

    storyId: string;

    constructor(private storyConnector: StoryConnector,
                private loggingHelper: LoggingHelper) {
    }

    @computedFrom('storyConnector.all', 'storyId')
    get story(): Story {
        console.log("get story");
        return this.storyConnector.byId(this.storyId);
    }

    activate(params) {
        this.storyId = params.storyId;

        if (this.story === undefined) {
            this.storyConnector.fetchById(params.storyId);
        }
        this.loggingHelper.logViewStory(this.storyId);
    }

    detatched() {
        this.storyId = undefined;
    }


}