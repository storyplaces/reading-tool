import {Reading} from "../../resources/models/Reading";
import {bindable, inject, Factory, BindingEngine, Disposable} from "aurelia-framework";
import {ReadingConnector} from "../../resources/store/ReadingConnector";
import {Authenticator} from "../../resources/auth/Authenticator";
import {LoggingHelper} from "../../resources/logging/LoggingHelper";
import {StoryCollection} from "../../resources/collections/StoryCollection";
/**
 * Created by andy on 28/11/16.
 */

@inject(
    ReadingConnector,
    Factory.of(Reading),
    BindingEngine,
    Authenticator,
    LoggingHelper,
    StoryCollection
)
export class ReadingOverviewListCustomElement {

    constructor(private readingConnector: ReadingConnector,
                private readingFactory: (any?) => Reading,
                private bindingEngine: BindingEngine,
                private auth: Authenticator,
                private loggingHelper: LoggingHelper,
                private storyCollection: StoryCollection) {

    }

    @bindable storyId: string;

    readings: Array<Reading> = [];

    subscription: Disposable;

    attached() {
        this.getReadings();
        this.subscription = this.bindingEngine
            .collectionObserver(this.readingConnector.all)
            .subscribe(() => {
                    this.getReadings();
                }
            );
        this.refresh();
    }

    getReadings() {
        this.readings = this.readingConnector.byStoryId(this.storyId)
            .sort((a: Reading, b: Reading) => {
                if (a.state == b.state) {
                    if (a.timestamp < b.timestamp) {return 1}
                    if (a.timestamp > b.timestamp) {return -1}
                    return 0;
                }

                if (a.state == "closed") { return 1 }
                if (b.state == "closed") {return -1}
                if (a.state == "inprogress") { return -1 }
                if (b.state == "inprogress") {return 1}

                return 0
            });
    }

    detached() {
        this.subscription.dispose();
    }

    newReading() {
        var readingName = "Reading " + (this.readings.length + 1);
        var reading = this.readingFactory({storyId: this.storyId, userId: this.auth.userId, name: readingName});
        this.readingConnector.save(reading);
        this.loggingHelper.logNewReading(this.storyCollection.get(this.storyId));
        this.refresh();
    }

    refresh() {
        this.readingConnector.fetchForUserAndStory(this.auth.userId, this.storyId);
    }


}