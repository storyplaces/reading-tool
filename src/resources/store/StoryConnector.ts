/**
 * Created by andy on 29/11/16.
 */


import {AbstractConnector} from "./AbstractConnector";
import {StoryCollection} from "../collections/StoryCollection";
import {autoinject} from 'aurelia-framework';
import {Story} from "../models/Story";
import {StoryplacesAPI} from "./StoryplacesAPI"

@autoinject()
export class StoryConnector extends AbstractConnector<Story> {

    constructor(private storyCollection : StoryCollection, private storyplacesAPI : StoryplacesAPI) {
        super();
    }

    get all(): Array<Story> {
        return this.storyCollection.all;
    }

    byId(id: string): Story {
        return this.storyCollection.get(id);
    }

    fetchAll(): Promise<Array<Story>> {
        return this.storyplacesAPI.getStoryList().then(stories => {
            stories.json().then (stories => {
                return this.storyCollection.saveMany(stories)
            });
        })
    }

    fetchById(id: string): Promise<Story> {
        return this.storyplacesAPI.getStory(id).then(story => {
            story.json().then (story => {
                return this.storyCollection.save(story)
            });
        })
    }

    save(object: Story): Promise<Story> {
        return new Promise((success, failure) => {
            return success(new Story);
        });
    }

    remove(id: string): Promise<boolean> {
        return new Promise((success, failure) => {
            return success(true);
        });
    }

}