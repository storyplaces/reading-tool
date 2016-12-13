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
import {StageComponent} from "aurelia-testing";
import {bootstrap} from "aurelia-bootstrapper";
import {Container} from "aurelia-framework";

describe('StorySummary', () => {
    let component;

    let testId1 = "test1-id";
    let testName1 = "test1-name";
    let testAuthor1 = "test1-author";

    let testId2 = "test2-id";
    let testName2 = "test2-name";
    let testAuthor2 = "test2-author";

    let stories;

    let container: Container;

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        container = new Container().makeGlobal();
        stories = [
            {id: testId1, name: testName1, author: testAuthor1, tags: ["Southampton"]},
            {id: testId2, name: testName2, author: testAuthor2, tags: ["Bournemouth"]}
        ];

        component = StageComponent
            .withResources('components/story/story-overview-list')
            .inView('<story-overview-list stories.bind="stories"></story-overview-list>')
            .boundTo({stories: stories});
    });

    it('renders the contents of the stories', done => {
        component.create(bootstrap).then(() => {
            const listElement = document.querySelector("div");
            expect(listElement.innerHTML).toContain("test1-name");
            expect(listElement.innerHTML).toContain("test2-name");
            done();
        });
    });

    afterEach(() => {
        component.dispose();
        stories = undefined;
        container = undefined;
    });
});