/**
 * Created by andy on 28/11/16.
 */
import {StoryConnector} from "../resources/store/StoryConnector";
import {autoinject, BindingEngine, computedFrom} from "aurelia-framework";
import {Story} from "../resources/models/Story";

@autoinject()
export class StoryOverviewPage {
    constructor(private storyConnector: StoryConnector,
                private bindingEngine: BindingEngine) {
    }

    tag: string;
    tags: Array<string>;

    audiences = [{id: "family", name: "Family Friendly"}, {id: "general", name: "General Audience"}, {
        id: "advisory",
        name: "Advisory Content"
    }];
    selectedAudiences: Array<string> = [];
    selectedTags: Array<string> = [];

    @computedFrom('storyConnector.all')
    get stories(): Array<Story> {
        return this.storyConnector.all.filter((story: Story) => {
            return (story.publishState == "published");
        });
    }

    @computedFrom('selectedTags.length', ' selectedAudiences.length')
    get filtersApplied(): boolean {
        console.log("get filter");
        return (this.selectedTags.length != this.tags.length) || (this.selectedAudiences.length != this.audiences.length)
    }

    activate(params) {
        this.tag = params.tag;
        this.selectedTags = [];
        console.log("tag ", this.tag);
        return this.refresh().then(() => {
            if (params.tag) {
                this.selectedTags = [];
                let index = this.tags.indexOf(params.tag);
                if (index != -1) {
                    this.selectedTags.push(this.tags[index]);
                }
            }

            this.selectAllAudiences();
        });
    }

    clearFilters() {
        this.selectAllTags();
        this.selectAllAudiences()
    }

    private selectAllTags() {
        this.selectedTags = Array.from(this.tags);
    }

    private selectAllAudiences() {
        this.selectedAudiences = [];
        this.audiences.forEach(audience => {
            this.selectedAudiences.push(audience.id);
        });
    }

    refresh() {
        return this.storyConnector.fetchAll()
            .then(() => {
                this.tags = [];

                this.storyConnector.all.forEach(story => {
                    this.addUniqueTags(story);
                });

                this.selectAllTags();
            });
    }

    private addUniqueTags(story: Story) {
        story.tags.forEach(tag => {
            if (this.tags.indexOf(tag) == -1) {
                this.tags.push(tag);
            }
        });
    }

}