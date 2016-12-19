/**
 * Created by andy on 28/11/16.
 */

import {StoryConnector} from '../resources/store/StoryConnector';
import {autoinject, computedFrom} from 'aurelia-framework';
import {Gps} from "../resources/gps/Gps";

@autoinject()
export class StoryOverviewPage{
    constructor(private storyConnector: StoryConnector) { }

    attached() {
        this.refresh();
    }

    @computedFrom('storyConnector.all')
    get stories(){
        console.log("get all");
        return this.storyConnector.all;
    }

    refresh() {
        this.storyConnector.fetchAll();
    }

}