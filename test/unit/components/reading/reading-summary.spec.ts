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

describe('ReadingSummary', () => {
    let component;

    let testId = "test-id";
    let testName = "test-reading-name";
    let testStoryId = "test-story-id";
    let testUserId = "test-user";

    let reading;

    let container: Container;

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        container = new Container().makeGlobal();
        reading = {id: testId, name: testName, storyId: testStoryId, userId: testUserId, variables: {}};

        component = StageComponent
            .withResources('components/reading/reading-summary')
            .inView('<reading-summary reading.bind="reading"></reading-summary>')
            .boundTo({reading: reading});
    });

    //TODO: Work out how to test the URL - looks like the router isn't initialised yet so its not calculating it.

    // it('should link to the correct path with the passed id', done => {
    //     component.create(bootstrap).then(() => {
    //         const contentsElement = document.querySelector("a");
    //         console.log(contentsElement);
    //         expect(contentsElement.getAttribute('href')).toContain("#/story/" + testStoryId + "/" + testId);
    //         done();
    //     });
    // });

    it('sets the name correctly', done => {
        component.create(bootstrap).then(() => {
            const titleElement = document.querySelector("h4");
            expect(titleElement.innerHTML).toEqual("test-reading-name");
            done();
        });
    });

    afterEach(() => {
        component.dispose();
        reading = undefined;
        container = undefined;
    });
});