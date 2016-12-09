/**
 * Created by andy on 29/11/16.
 */


import {AbstractConnector} from "./AbstractConnector";
import {StoryCollection} from "../collections/StoryCollection";
import {inject, NewInstance} from 'aurelia-framework';
import {Story} from "../models/Story";
import {StoryPlacesAPI} from "./StoryplacesAPI"

@inject(StoryCollection, NewInstance.of(StoryPlacesAPI))
export class StoryConnector extends AbstractConnector<Story> {

    constructor(private storyCollection : StoryCollection, private storyplacesAPI : StoryPlacesAPI) {
        super();
        this.storyplacesAPI.path = "/stories/";
    }

    get all(): Array<Story> {
        return this.storyCollection.all;
    }

    byId(id: string): Story {
        return this.storyCollection.get(id);
    }

    fetchAll(): Promise<Array<Story>> {
        return this.storyplacesAPI.getAll().then(stories => {
            return stories.json().then (stories => {
                this.storyCollection.saveMany(stories);
            });
        })
    }

    fetchById(id: string): Promise<Story> {
        return this.storyplacesAPI.getOne(id).then(story => {
            return story.json().then (story => {
                this.storyCollection.save(story);
            });
        })
    }

    save(object: Story): Promise<Story> {
        return this.storyplacesAPI.save(object).then(story => {
            return story.json().then (story => {
                this.storyCollection.save(story);
            });
        });
    }

    remove(id: string): Promise<boolean> {
        return new Promise((success) => {
            return success(true);
        });
    }

}