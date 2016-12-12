/**
 * Created by andy on 28/11/16.
 */
import {StoryConnector} from "../resources/store/StoryConnector";
import {autoinject} from "aurelia-framework";
import {Story} from "../resources/models/Story";

@autoinject()
export class StoryDetailPage {

    constructor(private storyConnector: StoryConnector) {
    }

    story: Story;

    activate(params) {

        this.story = this.storyConnector.byId(params.storyId);

        if (this.story === undefined) {
            this.storyConnector.fetchById(params.storyId).then(() => {
                this.story = this.storyConnector.byId(params.storyId);
            });
        }
    }

    deactivate() {
        this.story = undefined;
    }


}