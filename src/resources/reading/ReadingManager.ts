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

import {LocationManager} from "../gps/LocationManager";
import {autoinject, BindingEngine} from "aurelia-framework";
import {Reading} from "../models/Reading";
import {Story} from "../models/Story";

@autoinject()
export class ReadingManager {

    private story: Story;
    private reading: Reading;

    constructor(private locationManager: LocationManager, private bindingEngine: BindingEngine) {
    }

    attach(story: Story,reading: Reading) {
        this.story = story;
        this.reading = reading;

        this.updateStatus();

        this.attachListeners();
    }

    detach() {
        this.reading = undefined;
        this.story = undefined;
    }

    private attachListeners() {
        this.bindingEngine.collectionObserver(this.reading.variables.all).subscribe(() => this.updateStatus());
        this.bindingEngine.propertyObserver(this.locationManager, 'location').subscribe(() => this.updateStatus());
    }

    private updateStatus() {
        console.log("Updating status");
        this.story.pages.forEach(page => {
            page.updateStatus(this.reading.variables, this.story.conditions, this.story.locations, this.locationManager.location);
        });
    }

}