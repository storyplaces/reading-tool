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
import {MapCore} from "../../../resources/mapping/MapCore";
import {inject, Factory} from "aurelia-framework";
import {MapMapLayer} from "../../../resources/map/layers/MapMapLayer";
import {MapGroup} from "../../../resources/mapping/layers/MapGroup";
import {MapLayerInterface} from "../../../resources/mapping/interfaces/MapLayerInterface";
import {MapCircle} from "../../../resources/mapping/markers/MapCircle";
import {MapCircleMarker} from "../../../resources/mapping/markers/MapCircleMarker";
import {MapMarker} from "../../../resources/mapping/markers/MapMarker";
import CircleOptions = L.CircleOptions;
import {MapIcon} from "../../../resources/mapping/icons/MapIcon";
import {RedIcon} from "../../../resources/map/icons/RedIcon";
import MarkerOptions = L.MarkerOptions;
import {StatusMarker} from "../../../resources/map/markers/StatusMarker";


@inject(MapCore,
    MapMapLayer,
    Factory.of(StatusMarker),
    Factory.of(MapCircle),
    Factory.of(MapCircleMarker),
    Factory.of(MapGroup),
    Factory.of(RedIcon)
)
export class MapCustomElement {
    mapElement: HTMLElement;

    constructor(private map: MapCore,
                private baseLayer: MapMapLayer,
                private markerFactory: (lat: number, lng: number, options?: MarkerOptions) => StatusMarker,
                private circleFactory: (lat: number, lng: number, radius: number, options?: CircleOptions) => MapCircle,
                private circleMarkerFactory: (lat: number, lng: number, radius: number, options?: CircleOptions) => MapCircleMarker,
                private mapGroupFactory: (layers?: Array<MapLayerInterface>) => MapGroup,
                private mapIconFactory: (settings?: any) => MapIcon) {
    }

    attached() {
        this.map.attachTo(this.mapElement);
        this.map.addItem(this.baseLayer);

        let circle = this.circleFactory(50.935659, -1.396098, 50);
        let circleMarker = this.circleMarkerFactory(50.935659, -1.396098, 50);
        let marker = this.markerFactory(50.935659, -1.396098);
        let group = this.mapGroupFactory([marker, circle, circleMarker]);

        this.map.addItem(group);
        //circle.radius = 20;
        circle.fillColour = '#ff0000';

        marker.state = false;
    }

    detached() {
        this.map.detach();
    }
}