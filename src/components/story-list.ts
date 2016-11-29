/**
 * Created by andy on 28/11/16.
 */

import {StoryConnector} from '../store/StoryConnector';
import {autoinject} from 'aurelia-framework';

@autoinject()
export class StoryList{
    selectedId = 0;

    constructor(private storyConnector: StoryConnector) { }

    get stories(){
        return this.storyConnector.all;
    }

    select(story){
        this.selectedId = story.id;
        return true;
    }
}