/**
 * Created by andy on 28/11/16.
 */

import {StoryConnector} from '../resources/store/StoryConnector';
import {autoinject} from 'aurelia-framework';

@autoinject()
export class StoryOverviewPage{
    selectedId = 0;

    constructor(private storyConnector: StoryConnector) { }

    attached() {
        this.storyConnector.fetchAll();
    }

    get stories(){
        return this.storyConnector.all;
    }

    select(story){
        this.selectedId = story.id;
        return true;
    }
}