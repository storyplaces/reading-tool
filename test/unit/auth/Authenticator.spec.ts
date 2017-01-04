import {Authenticator} from "../../../src/resources/auth/Authenticator";
import {TypeChecker} from "../../../src/resources/utilities/TypeChecker";
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

describe("Authenticator", () => {

    let auth: Authenticator;
    let mockApi: MockApi;

    class MockApi {
        path: string = undefined;

        constructor(private response: string) {
        }

        save() {
            return new Promise((resolve) => {
                resolve(new Response(this.response));
            });
        }
    }

    beforeEach(() => {
    });

    afterEach(() => {
        auth = undefined;
        mockApi = undefined;
    });

    it("sets the path correctly on the API connector", () => {
        mockApi = new MockApi("");
        auth = new Authenticator(mockApi as any, new TypeChecker);
        expect(mockApi.path).toContain("user");
    });

    it("saves the user to persistent storage if its not yet set", (done) => {
        mockApi = new MockApi('{"id":"123"}');
        auth = new Authenticator(mockApi as any, new TypeChecker);

        localStorage.removeItem("userId");
        auth.login().then(result => {
            expect(localStorage.getItem("userId")).toEqual("123");
            done();
        });
    });

    it("reads the userId from localstorage if its already set", (done) => {
        mockApi = new MockApi('{"id":"123"}');
        auth = new Authenticator(mockApi as any, new TypeChecker);

        spyOn(mockApi, 'save');

        localStorage.setItem("userId", "abc");

        auth.login().then(result => {
            expect(mockApi.save).not.toHaveBeenCalled();
            done();
        });
    });

    it("sets the userId when fetching from the server", (done) => {
        mockApi = new MockApi('{"id":"123"}');
        auth = new Authenticator(mockApi as any, new TypeChecker);

        localStorage.removeItem("userId");
        auth.login().then(result => {
            expect(auth.userId).toEqual("123");
            done();
        });
    });

    it("sets the userId when reading from localstorage", (done) => {
        mockApi = new MockApi('{"id":"123"}');
        auth = new Authenticator(mockApi as any, new TypeChecker);
        localStorage.setItem("userId", "abc");

        auth.login().then(result => {
            expect(auth.userId).toEqual("abc");
            done();
        });
    });

    it("unsets the userId when calling logout", (done) => {
        mockApi = new MockApi('{"id":"123"}');
        auth = new Authenticator(mockApi as any, new TypeChecker);
        localStorage.setItem("userId", "abc");

        auth.login().then(result => {
            expect(auth.userId).toEqual("abc");
            auth.logout();
            expect(auth.userId).toBeUndefined();
            done();
        });
    });

    it("unsets the localstorage when calling logout", (done) => {
        mockApi = new MockApi('{"id":"123"}');
        auth = new Authenticator(mockApi as any, new TypeChecker);
        localStorage.setItem("userId", "abc");

        auth.login().then(result => {
            expect(localStorage.getItem("userId")).toEqual("abc");
            auth.logout();
            expect(localStorage.getItem("userId")).toBeNull();
            done();
        });
    });

    it("follows the catch path if the server returns bad data", (done) => {
        mockApi = new MockApi('');
        auth = new Authenticator(mockApi as any, new TypeChecker);

        localStorage.removeItem("userId");

        auth.login()
            .then(result => {
                fail(); // We fail the test manually as we shoudl not have got here
                done();
            })
            .catch(err => {
                expect(err).not.toBeUndefined();
                done();
            });
    });
});