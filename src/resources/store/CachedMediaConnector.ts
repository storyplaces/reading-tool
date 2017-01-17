/*******************************************************************
 *
 * StoryPlaces
 *
 This application was developed as part of the Leverhulme Trust funded
 StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk
 Copyright (c) 2017
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
import {LocalStore} from "./LocalStore";
import {inject, NewInstance} from "aurelia-framework";
import {Story} from "../models/Story";
import {CachedMediaAPI} from "./CachedMediaAPI";
import {Config} from "../../config/Config";

@inject(LocalStore, NewInstance.of(CachedMediaAPI), Config)
export class CachedMediaConnector {

    constructor(private localStore: LocalStore, private api: CachedMediaAPI, private config: Config) {
        this.api.path = "story";
    }

    fetchForStory(story: Story) {
        this.deleteOtherStoriesCachedData(story.id);

        story.cachedMediaIds.forEach(itemId => {
            if (!this.getItem(story.id, itemId)) {
                this.fetchItem(story.id, itemId);
            }
        });
    }

    getItemSrc(storyId: string, itemId: number): string {
        let itemFromStore = this.getItem(storyId, itemId);

        if (itemFromStore) {
            return itemFromStore;
        }

        return this.makeMediaUrl(storyId, itemId);
    }

    private fetchItem(storyId: string, itemId: number) {
        this.api.getCachedMedia(storyId, itemId)
            .then(content => {
                let data = this.makeDataURLFromContent(content);
                this.saveItem(storyId, itemId, data);
            })
            .catch(error => {
                //Just a placeholder to stop the failure from whinging
            });
    }

    private getItem(storyId: string, itemId: number) {
        return this.localStore.getItem("cached-media", this.makeStoreId(storyId, itemId));
    }

    private saveItem(storyId: string, itemId: number, content: string) {
        this.localStore.saveItem("cached-media", this.makeStoreId(storyId, itemId), content);
    }

    private deleteOtherStoriesCachedData(storyId: string) {
        let allCachedDataIds = this.localStore.getIdsOfAllItemsInGroup("cached-media");

        allCachedDataIds.forEach(id => {
           let cachedStoryId = id.split(".", 1)[0];
           if (cachedStoryId != storyId) {
               this.localStore.deleteItem("cached-media", id);
           }
        });
    }

    private makeMediaUrl(storyId: string, itemId: number): string {
        return `${this.config.read('server')}/story/${storyId}/media/${itemId}`;
    }

    private makeDataURLFromContent(content) {
        return `data:${content.contentType};base64,${content.content}`;
    }

    private makeStoreId(storyId: string, itemId: number) {
        return `${storyId}.${itemId.toString()}`;
    }
}