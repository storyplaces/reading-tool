/**
 * Created by andy on 28/11/16.
 */
import {autoinject, bindable, BindingEngine, computedFrom, observable, Disposable} from "aurelia-framework";
import {Story} from "../../resources/models/Story";

@autoinject()
export class StoryOverviewFilter {
    audiences = [
        {id: "family", name: "Family Friendly"},
        {id: "general", name: "General Audience"},
        {id: "advisory", name: "Advisory Content"}
    ];
    @bindable stories: Array<Story>;
    @bindable refresh: Function;
    @bindable tag: string;
    @bindable loading: boolean;
    private selectedAudiences: Array<string> = [];
    private selectedTags: Array<string> = [];
    private tags: Array<string>;
    private _stories: Array<Story>;
    private storyBinding: Disposable;
    private tagBinding: Disposable;

    constructor(private bindingEngine: BindingEngine) {
        this.tags = [];
        this.selectedTags = [];
        this.selectedAudiences = [];
        this._stories = [];
        this.selectAllAudiences();
    }

    activate() {
        this.storyBinding = this.bindingEngine.collectionObserver(this.stories).subscribe(this.storiesChanged);
        this.tagBinding = this.bindingEngine.propertyObserver(this, 'tag').subscribe(this.tagChanged);
    }

    deactivate() {
        if (this.storyBinding) {
            this.storyBinding.dispose();
        }

        if (this.tagBinding) {
            this.tagBinding.dispose();
        }
    }

    @computedFrom('selectedTags.length', ' selectedAudiences.length')
    get filtersApplied(): boolean {
        return (this.selectedTags.length != this.tags.length) || (this.selectedAudiences.length != this.audiences.length)
    }

    private storiesChanged() {
        this.selectedTags = [];
        this.tags = [];

        if (!this.stories) {
            this._stories = [];
            return;
        }

        this._stories = this.stories.filter((story: Story) => story.publishState == "published");

        this._stories.forEach((story: Story) => {
            if (story.tags.length === 0) {
                story.tags = ['Untagged'];
            }
            this.addUniqueTags(story)
        });

        this.tagChanged();
    }

    private tagChanged() {

        if (!this.tag) {
            this.selectAllTags();
            return;
        }

        this.selectTagFromUrl();
    }

    private selectTagFromUrl() {
        this.selectedTags = [];
        let index = this.tags.indexOf(this.tag);
        if (index != -1) {
            this.selectedTags.push(this.tags[index]);
        }
    }

    private resetFilters() {
        this.selectAllTags();
        this.selectAllAudiences()
    }

    private selectAllTags() {
        this.selectedTags = Array.from(this.tags);
    }

    private selectAllAudiences() {
        this.selectedAudiences = this.audiences.map(audience => audience.id);
    }

    private addUniqueTags(story: Story) {
        story.tags.forEach(tag => {
            if (this.tags.indexOf(tag) == -1) {
                this.tags.push(tag);
            }
        });
    }

    private refreshList() {
        if (this.refresh) {
            this.refresh();
        }
    }
}