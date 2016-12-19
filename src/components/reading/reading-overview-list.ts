import {Reading} from "../../resources/models/Reading";
import {bindable, computedFrom, inject, Factory} from "aurelia-framework";
import {ReadingConnector} from "../../resources/store/ReadingConnector";
/**
 * Created by andy on 28/11/16.
 */

@inject(
    ReadingConnector,
    Factory.of(Reading)
)
export class ReadingOverviewListCustomElement{

    constructor(private readingConnector: ReadingConnector,
                private readingFactory: (any?) => Reading) {
    }

    @bindable storyId: string;

    attached() {
        this.refresh();
    }

    @computedFrom('readingConnector.byStoryId', 'storyId')
    get readings() : Array<Reading>{
        console.log("get readings");
        return this.readingConnector.byStoryId(this.storyId);
    }

    newReading() {
        var readingName = "Reading " + (this.readings.length+1);
        var reading = this.readingFactory({storyId: this.storyId, userId: "placeholder", name: readingName});
        this.readingConnector.save(reading);
        this.refresh();
    }

    refresh() {
        this.readingConnector.fetchAll();
    }


}