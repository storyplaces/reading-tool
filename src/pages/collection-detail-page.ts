/**
 * Created by andy on 28/11/16.
 */
import {StoryConnector} from "../resources/store/StoryConnector";
import {autoinject, computedFrom} from "aurelia-framework";
import {Story} from "../resources/models/Story";
import {CollectionConnector} from "../resources/store/CollectionConnector";
import {Collection} from "../resources/models/Collection";

@autoinject()
export class StoryDetailPage {
    private tag: string;
    private collection: Collection;
    private collectionSlug: string;
    private stories: Array<Story>;
    private loading: boolean;

    constructor(private storyConnector: StoryConnector, private collectionConnector: CollectionConnector) {
        this.tag = "";
    }

    activate(params) {
        this.loading = false;
        this.tag = params.tag;
        this.collectionSlug = params.slug;

        if (typeof this.collectionSlug != "string") {
            throw new Error("collection Id must be a string");
        }

        return this.refresh();
    }

    refresh() {
        this.loading = true;
        return this.collectionConnector.fetchAll()
            .then(() => {
                this.collection = this.collectionConnector.all.find(collection => collection.slug === this.collectionSlug);
                if (!this.collection) {
                    throw new Error("Unable to find collection");
                }
            })
            .then(() => {
                let promises = [];
                this.collection.storyIds.forEach(storyId => {
                    let promiseToFetch =this.storyConnector.fetchById(storyId);
                   promises.push(promiseToFetch);
                });
                return Promise.all(promises);
            })
            .then(() => {
               this.stories = this.storyConnector.all;
               this.loading = false;
            });
    }
}