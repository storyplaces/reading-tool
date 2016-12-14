/**
 * Created by andy on 28/11/16.
 */

import {ReadingConnector} from '../resources/store/ReadingConnector';
import {autoinject, computedFrom} from 'aurelia-framework';

@autoinject()
export class ReadingOverviewPage{
    constructor(private readingConnector: ReadingConnector) { }

    attached() {
        //this.refresh();
    }

    @computedFrom('readingConnector.all')
    get readings(){
        console.log("get all");
        return this.readingConnector.all;
    }

    refresh() {
        this.readingConnector.fetchAll();
    }

}