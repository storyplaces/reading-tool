/*!*****************************************************************
 *
 * StoryPlaces
 *
 This application was developed as part of the Leverhulme Trust funded
 StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk
 Copyright (c) 2016
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
 * The name of the Universities of Southampton nor the name of its
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
import {PageCollection} from "../collections/PageCollection";
import {PagesMapViewSettings} from "./PagesMapViewSettings";
import {Factory, inject} from "aurelia-framework";
import {BaseModel} from "./BaseModel";

@inject(Factory.of(PageCollection), Factory.of(PagesMapViewSettings))
export class Story extends BaseModel {
    name: string;
    pages: PageCollection;
    cachedMediaIds: Array<number>;
    conditions: any;
    functions: any;
    tags: Array<string>;
    description: string;
    author: string;
    pagesMapViewSettings: PagesMapViewSettings;

    constructor(private pageCollectionFactory: (any?) => PageCollection,
                private pagesMapViewSettingsFactory: (any?) => PagesMapViewSettings,
                data?: any) {
        super();
        this.fromObject(data);
    }

    public fromObject({id = undefined, name = undefined, pages = undefined, cachedMediaIds = undefined, conditions = undefined, pagesMapViewSettings = undefined, functions = undefined, tags = undefined, author = undefined, description = undefined} = {}) {
        this.id = id;
        this.author = author;
        this.cachedMediaIds = cachedMediaIds;
        this.conditions = conditions;
        this.description = description;
        this.functions = functions;
        this.pages = this.pageCollectionFactory(pages);
        this.pagesMapViewSettings = this.pagesMapViewSettingsFactory(pagesMapViewSettings);
        this.name = name;
        this.tags = tags;
    }

    public toJSON() {
        return {
            id: this.id,
            author: this.author,
            cachedMediaIds: this.cachedMediaIds,
            conditions: this.conditions,
            description: this.description,
            functions: this.functions,
            pages: this.pages,
            pagesMapViewSettings: this.pagesMapViewSettings,
            name: this.name,
            tags: this.tags
        }
    }
}