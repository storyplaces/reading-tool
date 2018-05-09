/**
 * Created by andy on 29/11/16.
 */


import {AbstractConnector} from "./AbstractConnector";
import {inject, NewInstance} from 'aurelia-framework';
import {Collection} from "../models/Collection";
import {StoryPlacesAPI} from "./StoryplacesAPI"
import {CollectionCollection} from "../collections/CollectionCollection";

@inject(NewInstance.of(CollectionCollection), NewInstance.of(StoryPlacesAPI))
export class CollectionConnector extends AbstractConnector<Collection> {

    constructor(private collectionCollection : CollectionCollection, private storyplacesAPI : StoryPlacesAPI) {
        super();
        this.storyplacesAPI.path = "/collection/";
    }

    get all(): Array<Collection> {
        return this.collectionCollection.all;
    }

    byId(id: string): Collection {
        return this.collectionCollection.get(id);
    }

    byIdOrFetch(id: string): Promise<Collection> {
        return new Promise(complete => {
            if (this.collectionCollection.get(id)) {
                complete(this.collectionCollection.get(id));
                return;
            }

            complete(this.fetchById(id).then(() => this.collectionCollection.get(id)));
        });
    }

    fetchAll(): Promise<Array<Collection>> {
        return this.storyplacesAPI.getAll()
            .then(stories => stories.json() as any)
            .then(stories => {
                this.collectionCollection.saveMany(stories);
                return stories;
            });
    }

    fetchById(id: string): Promise<Collection> {
        return this.storyplacesAPI.getOne(id)
            .then(story => story.json())
            .then(story => {
                this.collectionCollection.save(story);
                return story;
            });
    }

    save(object: Collection): Promise<Collection> {
        return this.storyplacesAPI.save(object)
            .then(story => story.json())
            .then(story => {
                this.collectionCollection.save(story);
                return story;
            });
    }

    remove(id: string): Promise<boolean> {
        return new Promise((success) => {
            return success(true);
        });
    }
}