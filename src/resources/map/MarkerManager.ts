/*******************************************************************
 *
 * StoryPlaces
 *
 This application was developed as part of the Leverhulme Trust funded
 StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk
 Copyright (c) $today.year
 University of Southampton
 Charlie Hargood, cah07r.ecs.soton.ac.uk
 Kevin Puplett, k.e.puplett.soton.ac.uk
 David Pepper, d.pepper.soton.ac.uk

 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * The name of the University of Southampton nor the name of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE ABOVE COPYRIGHT HOLDERS BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import {MapCore} from "../mapping/MapCore";
import {StatusMarker} from "./markers/StatusMarker";
import {inject, Factory, Disposable, BindingEngine} from "aurelia-framework";
import {Story} from "../models/Story";
import {MapMarker} from "../mapping/markers/MapMarker";
import {BaseLocation} from "../models/locations/BaseLocation";
import {Page} from "../models/Page";
import {CircleLocation} from "../models/locations/CircleLocation";
import {StatefulMarker} from "./interfaces/StatefulMarker";
import {ReadingManager} from "../reading/ReadingManager";
import {PopupMarker} from "./interfaces/PopupMarker";

@inject(MapCore, BindingEngine, Factory.of(StatusMarker))
export class MarkerManager {

    private story: Story;
    private readingManager: ReadingManager;
    private pagesSub: Disposable;
    private markers: Array<StatefulMarker & MapMarker & PopupMarker> = [];

    constructor(private mapCore: MapCore,
                private bindingEngine: BindingEngine,
                private statusMakerFactory: (lat?: number, lon?: number, state?: boolean) => StatusMarker) {
    }

    attach(readingManager: ReadingManager) {
        this.story = readingManager.story;
        this.readingManager = readingManager;
        this.pagesSub = this.bindingEngine.propertyObserver(this.readingManager, 'viewablePages').subscribe((newValue, oldValue) => this.pagesChanged(newValue, oldValue));
        this.initMarkers();
    }

    detach() {
        this.pagesSub.dispose();
        this.story = undefined;
        this.markers.forEach(marker => marker.destroy());
        this.markers = [];
    }

    private initMarkers() {
        this.createMarkersFromStory(this.readingManager.story);
        this.pagesChanged(this.readingManager.viewablePages, []);
    }

    private getLocation(locationId): BaseLocation {
        return this.story.locations.getOrFail(locationId);
    }

    private createMarkersFromStory(story: Story) {
        story.pages.forEach(page => {
            page.hintLocations.forEach(locationId => {
                let marker;
                let location = this.getLocation(locationId);

                if (location instanceof CircleLocation) {
                    marker = this.statusMakerFactory(location.lat, location.lon, page.isReadable);
                    marker.pageId = page.id;
                }

                marker.popupText = `<p><b>${page.name}</b></p>${page.hintDirection}`;

                this.markers.push(marker);
            });
        });
    }

    private updateMarkersFromPage(page: Page) {
        console.log("Updating markers for ", page);
        let markersToUpdate = this.markers.filter(marker => marker.pageId == page.id);

        markersToUpdate.forEach(marker => {
            marker.state = page.isReadable;
        });
    }

    private removeMarkersFromPage(page: Page) {
        console.log("Removing markers for ", page);
        let markersToRemove = this.markers.filter(marker => marker.pageId == page.id);
        markersToRemove.forEach(marker => this.mapCore.removeItem(marker));
    }

    private addMarkersFromPage(page: Page) {
        console.log("Adding markers for ", page);
        let markersToAdd = this.markers.filter(marker => marker.pageId == page.id);
        markersToAdd.forEach(marker => this.mapCore.addItem(marker));
    }


    private pagesChanged(newPages: Array<Page>, oldPages: Array<Page>) {
        let changedPages = []

        newPages.forEach(page => {
            let oldPageIndex = oldPages.indexOf(page)

            if (oldPageIndex == -1) {
                this.addMarkersFromPage(page);
                return
            }

            this.updateMarkersFromPage(page);
            changedPages.push(page);
        });

        //oldPages now is things to remove
        oldPages.forEach(page => {
            if (changedPages.indexOf(page) == -1) {
                this.removeMarkersFromPage(page);
            }
        });
    }


}