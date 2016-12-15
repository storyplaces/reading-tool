/**
 * Created by andy on 28/11/16.
 */
import {StoryConnector} from "../resources/store/StoryConnector";
import {autoinject, computedFrom} from "aurelia-framework";
import {Story} from "../resources/models/Story";

@autoinject()
export class StoryReadingPage {

    storyId: string;

    constructor(private storyConnector: StoryConnector) {
    }

    @computedFrom('storyConnector.all', 'storyId')
    get story() : Story{
        return this.storyConnector.byId(this.storyId);
    }

    activate(params) {
        this.storyId = params.storyId;

        if (this.story === undefined) {
            this.storyConnector.fetchById(params.storyId);
        }
    }

    deactivate() {
        this.storyId = undefined;
    }


}