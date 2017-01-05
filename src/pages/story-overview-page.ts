/**
 * Created by andy on 28/11/16.
 */

import {StoryConnector} from '../resources/store/StoryConnector';
import {autoinject, BindingEngine, Disposable} from 'aurelia-framework';
import {Story} from "../resources/models/Story";

@autoinject()
export class StoryOverviewPage {
    constructor(private storyConnector: StoryConnector,
                private bindingEngine: BindingEngine) {
    }

    tag: string;
    stories: Array<Story>;

    storiesSubscription: Disposable;
    tagSubscription: Disposable;

    attached() {
        this.getStories();
        this.storiesSubscription = this.bindingEngine
            .collectionObserver(this.storyConnector.all)
            .subscribe(() => {
                this.getStories();
            });
        this.tagSubscription = this.bindingEngine
            .propertyObserver(this, 'tag')
            .subscribe(() => {
                this.getStories();
            });
        this.refresh();
    }

    getStories() {
        if (!this.tag) {
            this.stories = this.storyConnector.all;
            return;
        }
        this.stories = this.storyConnector.all.filter((story) => {
            return (story.tags.indexOf(this.tag) !== -1)
        });
    }

    activate(params) {
        this.tag = params.tag;
        console.log("tag ", this.tag);
    }

    detatched() {
        this.storiesSubscription.dispose();
        this.tagSubscription.dispose();

    }

    refresh() {
        this.storyConnector.fetchAll();
        console.log("stories ", this.storyConnector.all);
    }

}