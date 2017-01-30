/**
 * Created by andy on 29/11/16.
 */


import {AbstractConnector} from "./AbstractConnector";
import {StoryCollection} from "../collections/StoryCollection";
import {inject, NewInstance} from 'aurelia-framework';
import {Story} from "../models/Story";
import {StoryPlacesAPI} from "./StoryplacesAPI"

@inject(NewInstance.of(StoryCollection), NewInstance.of(StoryPlacesAPI))
export class StoryConnector extends AbstractConnector<Story> {

    constructor(private storyCollection : StoryCollection, private storyplacesAPI : StoryPlacesAPI) {
        super();
        this.storyplacesAPI.path = "/story/";
    }

    get all(): Array<Story> {
        return this.storyCollection.all;
    }

    byId(id: string): Story {
        return this.storyCollection.get(id);
    }

    byIdOrFetch(id: string): Promise<Story> {
        return new Promise(complete => {
           if (this.storyCollection.get(id)) {
               complete(this.storyCollection.get(id));
               return;
           }

           complete(this.fetchById(id).then(() => this.storyCollection.get(id)));
        });
    }

    fetchAll(): Promise<undefined> {
        return this.storyplacesAPI.getAll()
            .then(stories => stories.json() as any)
            .then(stories => {
                this.storyCollection.saveMany(stories);
                return;
            });
    }

    fetchById(id: string): Promise<undefined> {
        return this.storyplacesAPI.getOne(id)
            .then(story => story.json())
            .then(story => {
                this.storyCollection.save(story);
                return;
            });
    }

    save(object: Story): Promise<undefined> {
        return this.storyplacesAPI.save(object)
            .then(story => story.json())
            .then(story => {
                this.storyCollection.save(story);
                return;
            });
    }

    remove(id: string): Promise<boolean> {
        return new Promise((success) => {
            return success(true);
        });
    }

}