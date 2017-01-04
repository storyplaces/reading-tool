import {Reading} from "../../resources/models/Reading";
import {bindable, computedFrom, inject, Factory, BindingEngine, Disposable} from "aurelia-framework";
import {ReadingConnector} from "../../resources/store/ReadingConnector";
/**
 * Created by andy on 28/11/16.
 */

@inject(
    ReadingConnector,
    Factory.of(Reading),
    BindingEngine
)
export class ReadingOverviewListCustomElement {

    constructor(private readingConnector: ReadingConnector,
                private readingFactory: (any?) => Reading,
                private bindingEngine: BindingEngine) {

    }

    @bindable storyId: string;

    readings: Array<Reading> = [];

    subscription : Disposable;

    attached() {
        this.subscription = this.bindingEngine
            .collectionObserver(this.readingConnector.all)
            .subscribe((newValue: Array<Reading>) => {
                    this.readings = this.readingConnector.byStoryId(this.storyId);
                }
            );
        this.refresh();
    }

    detached() {
        this.subscription.dispose();
    }

    newReading() {
        var readingName = "Reading " + (this.readings.length + 1);
        var reading = this.readingFactory({storyId: this.storyId, userId: "placeholder", name: readingName});
        this.readingConnector.save(reading);
        this.refresh();
    }

    refresh() {
        this.readingConnector.fetchAll();
    }


}