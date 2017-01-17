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

    let testId = "test-id";
    let testName = "test-name";
    let testAuthor = "test-author";

    let story;

    let container: Container;

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        container = new Container().makeGlobal();
        story = {id: testId, name: testName, author: testAuthor, tags: ["Southampton", "Bournemouth"], audience: ""};

        component = StageComponent
            .withResources('components/story/story-summary')
            .inView('<story-summary story.bind="story"></story-summary>')
            .boundTo({story: story});
    });

    //TODO: Work out how to test the URL - looks like the router isn't initialised yet so its not calculating it.

    // it('should link to the correct path with the passed id', done => {
    //     component.create(bootstrap).then(() => {
    //         const contentsElement = document.querySelector("a");
    //         expect(contentsElement.getAttribute('href')).toContain("#/story/" + testId);
    //         done();
    //     });
    // });

    it('sets the title and subtitle correctly', done => {
        component.create(bootstrap).then(() => {
            const titleElement = document.querySelector("h4");
            expect(titleElement.innerHTML).toEqual("test-name<small><br>test-author</small>");
            done();
        });
    });

    it('shows the family friendly label when the audience is set as family', done => {
        story.audience="family";
        component.create(bootstrap).then(() => {
            const metaDataElement = document.querySelector("div.list-group-item-text");
            expect(metaDataElement.innerHTML).toContain('<span class="label label-success">Family Friendly</span>');
            expect(metaDataElement.innerHTML).not.toContain('Advisory Content');
            expect(metaDataElement.innerHTML).not.toContain('General Audience');
            done();
        });
    });

    it('shows the family advisory content label when the audience is set as advisory', done => {
        story.audience="advisory";
        component.create(bootstrap).then(() => {
            const metaDataElement = document.querySelector("div.list-group-item-text");
            expect(metaDataElement.innerHTML).toContain('<span class="label label-danger">Advisory Content</span>');
            expect(metaDataElement.innerHTML).not.toContain('Family Friendly');
            expect(metaDataElement.innerHTML).not.toContain('General Audience');
            done();
        });
    });

    it('shows the general audience content label when the audience is set as general', done => {
        story.audience="general";
        component.create(bootstrap).then(() => {
            const metaDataElement = document.querySelector("div.list-group-item-text");
            expect(metaDataElement.innerHTML).toContain('<span class="label label-info">General Audience</span>');
            expect(metaDataElement.innerHTML).not.toContain('Family Friendly');
            expect(metaDataElement.innerHTML).not.toContain('Advisory Content');
            done();
        });
    });

    it('should shows the tags correctly', done => {
        component.create(bootstrap).then(() => {
            const metaDataElement = document.querySelector("div.list-group-item-text");
            expect(metaDataElement.innerHTML).toContain('<span class="label label-default">Southampton </span>');
            expect(metaDataElement.innerHTML).toContain('<span class="label label-default">Bournemouth </span>');
            done();
        });
    });

    afterEach(() => {
        component.dispose();
        story = undefined;
        container = undefined;
    });
});