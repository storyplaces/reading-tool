import {bindable, inject, Factory, computedFrom} from "aurelia-framework";
import {ReadingManager} from "../../resources/reading/ReadingManager";
import {LocationInformation} from "../../resources/gps/LocationInformation";
import {CircleLocation} from "../../resources/models/locations/CircleLocation";
import {LocateMapEvent} from "../../resources/events/LocateMapEvent";
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserConfig} from "../../resources/store/UserConfig";


/**
 * Created by andy on 28/11/16.
 */

@inject(Factory.of(LocateMapEvent), EventAggregator, UserConfig)
export class PageListCustomElement {

    @bindable readingManager: ReadingManager;

    readingId: string;
    storyId: string;

    private locateMapEventFactory: (location: LocationInformation) => LocateMapEvent;
    private eventAggregator: EventAggregator;
    private userConfig: UserConfig;

    constructor(locateMapEventFactory: (location: LocationInformation) => LocateMapEvent, eventAggregator: EventAggregator, userConfig: UserConfig) {
        this.locateMapEventFactory = locateMapEventFactory;
        this.eventAggregator = eventAggregator;
        this.userConfig = userConfig;
    }

    @computedFrom('userConfig.locationDemo')
    get demoMode() {
        return this.userConfig.locationDemo
    }

    bind() {
        this.readingId = this.readingManager.reading.id;
        this.storyId = this.readingManager.story.id;
        console.log(this.readingId, this.storyId);
    }

    locatePage(pageId: string) {
        console.log(pageId);

        if (!this.demoMode) {
            return;
        }

        let locationIds = this.readingManager.story.pages.get(pageId).hintLocations;

        if (locationIds.length == 0) {
            return;
        }

        let locationId = locationIds[0];

        let location = this.readingManager.story.locations.get(locationId) as CircleLocation;

        let locationInformation : LocationInformation = {
            latitude: location.lat,
            longitude: location.lon,
            heading: null,
            accuracy: null,
        };

        let event = this.locateMapEventFactory(locationInformation);
        this.eventAggregator.publish(event);
    }

}