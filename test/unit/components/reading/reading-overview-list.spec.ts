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
import {ReadingConnector} from "../../../../src/resources/store/ReadingConnector";

describe('StorySummary', () => {
    let component;

    let testId1 = "test-id-2";
    let testName1 = "test-reading-name-2";
    let testStoryId1 = "test-story-id-2";
    let testUserId1 = "test-user-2";

    let testId2 = "test-id-2";
    let testName2 = "test-reading-name-2";
    let testStoryId2 = "test-story-id-2";
    let testUserId2 = "test-user-2";

    let readings;

    let storyId = "test-story-id";

    let container: Container;

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        container = new Container().makeGlobal();
        readings = [
            {id: testId1, name: testName1, storyId: testStoryId1, userId: testUserId1, variables: {}},
            {id: testId2, name: testName2, storyId: testStoryId2, userId: testUserId2, variables: {}}
        ];

        component = StageComponent
            .withResources('components/reading/reading-overview-list')
            .inView('<reading-overview-list storyId.bind="storyId"></reading-overview-list>')
            .boundTo({storyId: storyId});
    });
    //TODO: Work out how to inject into component
    // it('renders the contents of the readings', done => {
    //
    //     let readingConnector = resolve(ReadingConnector);
    //     spyOn(readingConnector, "byStoryId").and.returnValue(readings);
    //
    //     component.create(bootstrap).then(() => {
    //         // Check calls
    //         expect(readingConnector.byStoryId).toHaveBeenCalledTimes(1);
    //         expect(readingConnector.byStoryId).toHaveBeenCalledWith(storyId);
    //
    //         // Check the view
    //         const listElement = document.querySelector("div");
    //         expect(listElement.innerHTML).toContain("test-reading-name-2");
    //         expect(listElement.innerHTML).toContain("test-reading-name-2");
    //         done();
    //     });
    // });

    afterEach(() => {
        component.dispose();
        readings = undefined;
        container = undefined;
    });
});