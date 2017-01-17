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
import {autoinject, BindingEngine, Disposable} from "aurelia-framework";
import {Reading} from "../models/Reading";
import {Story} from "../models/Story";
import {StoryConnector} from "../store/StoryConnector";
import {ReadingConnector} from "../store/ReadingConnector";
import {Page} from "../models/Page";

@autoinject()
export class ReadingManager {

    story: Story;
    reading: Reading;

    private variableSub: Disposable;
    private locationSub: Disposable;

    viewablePages: Array<Page>;

    constructor(private locationManager: LocationManager, private storyConnector: StoryConnector, private readingConnector: ReadingConnector, private bindingEngine: BindingEngine) {
    }

    attach(storyId: string, readingId: string, withUpdates: boolean = true) {
        return this.storyConnector.byIdOrFetch(storyId)
            .then((story) => {
                this.story = story;
            })
            .then(() => {
                return this.readingConnector.byIdOrFetch(readingId)
                    .then((reading) => {
                        this.reading = reading;
                    });
            })
            .then(() => {
                if (withUpdates) {
                    this.attachListeners();
                    this.updateStatus();
                }
                // Start the reading if it has not already been started.
                if (this.reading.state == "notstarted") {
                    this.startReading();
                }
            });
    }

    detach() {
        this.reading = undefined;
        this.story = undefined;
        this.detachListeners();
    }

    private attachListeners() {
        this.variableSub = this.bindingEngine.collectionObserver(this.reading.variables.all).subscribe(() => this.updateStatus());
        this.locationSub = this.bindingEngine.propertyObserver(this.locationManager, 'location').subscribe(() => this.updateStatus());
        window.setInterval(() => this.updateStatus(), 60 * 1000);
    }

    private detachListeners() {
        if (this.variableSub) {
            this.variableSub.dispose();
            this.variableSub = undefined;
        }

        if (this.locationSub) {
            this.locationSub.dispose();
            this.locationSub = undefined;
        }
    }

    private updateStatus() {
        console.log("updating page status");
        this.story.pages.forEach(page => {
            page.updateStatus(this.reading.variables, this.story.conditions, this.story.locations, this.locationManager.location);
        });

        this.viewablePages = this.story.pages.all.filter(page => page.isViewable);
    }

    executePageFunctions(page: Page) {
        page.executeFunctions(this.story.id, this.reading.id, this.reading.variables, this.story.conditions, this.story.locations, this.locationManager.location, this.story.functions);
        this.saveReading();
    }

    saveReading() {
        this.readingConnector.save(this.reading);
    }

    startReading() {
        this.reading.state = "inprogress";
        this.saveReading();
    }

    closeReading() {
        this.reading.state = "closed";
        this.saveReading();
    }
}