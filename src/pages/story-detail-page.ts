/**
 * Created by andy on 28/11/16.
 */
import {StoryConnector} from "../resources/store/StoryConnector";
import {autoinject} from "aurelia-framework";
import {Story} from "../resources/models/Story";
import {LoggingHelper} from "../resources/logging/LoggingHelper";
import {Router} from "aurelia-router";

@autoinject()
export class StoryDetailPage {

    storyId: string;
    story: Story;

    constructor(private storyConnector: StoryConnector,
                private loggingHelper: LoggingHelper,
                private router: Router) {
    }

    activate(params) {
        this.storyId = params.storyId;

        this.story = this.storyConnector.byId(this.storyId);

        if (this.story === undefined) {
            this.storyConnector.fetchById(params.storyId)
                .then(() => {
                    this.story = this.storyConnector.byId(this.storyId);

                    if (this.story === undefined) {
                        this.router.navigateToRoute('home');
                    }
                })
                .catch(() => {
                    this.router.navigateToRoute('home');
                });
        }

        this.loggingHelper.logViewStory(this.storyId);
    }

    detatched() {
        this.storyId = undefined;
    }
}