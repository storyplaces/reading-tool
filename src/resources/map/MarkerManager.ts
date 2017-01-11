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
import CircleMarker = L.CircleMarker;
import marker = L.marker;

@inject(MapCore, BindingEngine, Factory.of(StatusMarker))
export class MarkerManager {

    private story: Story;
    private pagesSub: Disposable;
    private markers: Array<StatefulMarker & MapMarker> = [];

    constructor(private mapCore: MapCore,
                private bindingEngine: BindingEngine,
                private statusMakerFactory: (lat?: number, lon?: number, state?: boolean) => StatusMarker) {
    }

    attach(story: Story) {
        this.story = story;
        this.pagesSub = this.bindingEngine.collectionObserver(story.pages.all).subscribe((changes) => this.pagesChanged(changes));
        //TODO: Do we need to destory any existing markers here?
        this.initMarkers();
    }

    detach() {
        this.pagesSub.dispose();
        this.story = undefined;
        this.markers.forEach(marker => marker.destroy());
        this.markers = [];
    }

    private initMarkers() {
        this.story.pages.forEach(page => {
            this.createMarkersFromPage(page);
        });
    }

    private getLocation(locationId): BaseLocation {
        return this.story.locations.getOrFail(locationId);
    }

    private createMarkersFromPage(page: Page) {
        page.hintLocations.forEach(locationId => {
            let marker;
            let location = this.getLocation(locationId);

            if (location instanceof CircleLocation) {
                marker = this.statusMakerFactory(location.lat, location.lon, page.isReadable);
                marker.pageId = page.id;
                console.log(marker);
            }

            this.markers.push(marker);
            console.log(page.isViewable);

            if (page.isViewable) {
                this.mapCore.addItem(marker);
            }
        });
    }

    private updateMarkersFromPage(page: Page) {
        let markersToUpdate = this.markers.filter(marker => marker.pageId == page.id);

        if (page.isViewable) {
            markersToUpdate.forEach(marker => {
                marker.state = page.isReadable;

                this.mapCore.hasItem(marker).then(hasMarker => {
                    if (!hasMarker) {
                        this.mapCore.addItem(marker);
                    }
                })
            });
        } else {
            markersToUpdate.forEach(marker => {
                this.mapCore.removeItem(marker);
            });
        }
    }

    private pagesChanged(changes) {
        console.log(changes);
    }
}