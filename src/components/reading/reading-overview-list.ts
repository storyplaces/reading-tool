import {Reading} from "../../resources/models/Reading";
import {bindable, inject, Factory, BindingEngine, Disposable} from "aurelia-framework";
import {ReadingConnector} from "../../resources/store/ReadingConnector";
import {Authenticator} from "../../resources/auth/Authenticator";
import {LoggingHelper} from "../../resources/logging/LoggingHelper";
/**
 * Created by andy on 28/11/16.
 */

@inject(
    ReadingConnector,
    Factory.of(Reading),
    BindingEngine,
    Authenticator,
    LoggingHelper
)
export class ReadingOverviewListCustomElement {

    constructor(private readingConnector: ReadingConnector,
                private readingFactory: (any?) => Reading,
                private bindingEngine: BindingEngine,
                private auth: Authenticator,
                private loggingHelper: LoggingHelper) {

    }

    @bindable storyId: string;

    readings: Array<Reading> = [];

    subscription: Disposable;

    attached() {
        this.getOpenReadings();
        this.subscription = this.bindingEngine
            .collectionObserver(this.readingConnector.all)
            .subscribe(() => {
                    this.getOpenReadings();
                }
            );
        this.refresh();
    }

    getOpenReadings() {
        this.readings = this.readingConnector.byStoryId(this.storyId).filter(reading => reading.state != "closed");
    }

    detached() {
        this.subscription.dispose();
    }

    newReading() {
        var readingName = "Reading " + (this.readings.length + 1);
        var reading = this.readingFactory({storyId: this.storyId, userId: this.auth.userId, name: readingName});
        this.readingConnector.save(reading);
        this.loggingHelper.logNewReading(this.storyId);
        this.refresh();
    }

    refresh() {
        this.readingConnector.fetchForUserAndStory(this.auth.userId, this.storyId);
    }


}