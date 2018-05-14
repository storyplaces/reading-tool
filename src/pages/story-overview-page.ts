/**
 * Created by andy on 28/11/16.
 */
import {StoryConnector} from "../resources/store/StoryConnector";
import {autoinject} from "aurelia-framework";
import {Story} from "../resources/models/Story";

@autoinject()
export class StoryOverviewPage {
    private tag: string;
    private stories: Array<Story>;
    private loading: boolean;

    constructor(private storyConnector: StoryConnector) {
        this.stories = [];
        this.tag = "";
    }

    activate(params) {
        this.loading = false;
        this.tag = params.tag;
        this.refresh();
    }

    refresh() {
        this.loading = true;
        this.storyConnector.fetchAll()
            .then(() => {
                this.stories = this.storyConnector.all;
                this.loading = false;
            });
    }
}