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
import {inject, BindingEngine, NewInstance, Disposable} from "aurelia-framework";
import {CurrentLocationMarker} from "./markers/CurrentLocationMarker";
import {MapMapLayer} from "./layers/MapMapLayer";
import {MapCore} from "../mapping/MapCore";
import {LocationSource, LocationRepository} from "../gps/LocationRepository";
import {LocationInformation} from "../gps/LocationInformation";
import {RecenterControl} from "./controls/RecenterControl";

@inject(
    BindingEngine,
    MapCore,
    MapMapLayer,
    LocationRepository,
    NewInstance.of(CurrentLocationMarker),
    NewInstance.of(RecenterControl)
)
export class MapManager {

    private mapElement: HTMLElement;
    private locationSub: Disposable;

    private panningWithLocation: boolean = true;

    constructor(private bindingEngine: BindingEngine,
                private mapCore: MapCore,
                private baseLayer: MapMapLayer,
                private location: LocationRepository,
                private currentLocationMarker: CurrentLocationMarker,
                private recenterControl: RecenterControl) {
    }

    attachToDom(mapElement: HTMLElement) {
        this.mapElement = mapElement;
        this.mapCore.attachTo(this.mapElement);
        this.mapCore.addItem(this.baseLayer);
        this.mapCore.addItem(this.currentLocationMarker);
        this.mapCore.addControl(this.recenterControl).then(() => {
            this.recenterControl.disable();
        });

        this.addEvents();

        this.locationSub = this.bindingEngine.propertyObserver(this.location, 'location').subscribe((location) => this.locationChanged(location));
        this.locationChanged(this.location.location);
    }

    detachFromDom() {
        this.locationSub.dispose();
        this.removeEvents()
        this.mapCore.detach();
    }

    private locationChanged(newLocation: LocationInformation) {
        this.currentLocationMarker.location = newLocation;

        if (this.location.source == LocationSource.GPS && this.panningWithLocation) {
            this.mapCore.panTo({lat: newLocation.latitude, lng: newLocation.longitude});
        }
    }

    private addEvents() {
        this.mapCore.addEvent('dblclick', () => this.enableRecenterControl());
        this.mapCore.addEvent('dragstart', () => this.enableRecenterControl());
        this.mapCore.addEvent('zoomstart', () => this.enableRecenterControl());

        this.mapCore.addEvent('recenter-control-click', () => this.disableRecenterControl());
    }

    private disableRecenterControl() {
        this.panningWithLocation = true;
        this.locationChanged(this.location.location);
        this.recenterControl.disable();
    }

    private enableRecenterControl() {
        if (this.panningWithLocation) {
            this.panningWithLocation = false;
            this.recenterControl.enable();
        }
    }

    private removeEvents() {
        this.mapCore.removeEvent('dblclick');
        this.mapCore.removeEvent('dragstart');
        this.mapCore.removeEvent('zoomstart');
        this.mapCore.removeEvent('recenter-control-click');
    }

}