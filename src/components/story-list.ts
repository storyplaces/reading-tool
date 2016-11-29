/**
 * Created by andy on 28/11/16.
 */

import {Fetch} from '../store/fetch';
import {autoinject} from 'aurelia-framework';

@autoinject()
export class StoryList{
    stories;
    selectedId = 0;

    constructor(private fetch: Fetch) { }

    created() {
        this.fetch.getStoryList().then(result => result.json()).then(stories => this.stories = stories);
    }

    select(story){
        this.selectedId = story.id;
        return true;
    }
}