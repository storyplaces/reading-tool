import {GpsState, Gps} from "../../../src/resources/gps/Gps";
import {LocationRepository} from "../../../src/resources/gps/LocationRepository";
import {Container, BindingEngine} from "aurelia-framework";

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

describe("LocationRepository", () => {

    class MockGps {
        public state: GpsState = GpsState.INITIALISING;
        public position: Position;
    }

    let mockGps: MockGps;
    let bindingEngine: BindingEngine;
    let container: Container = new Container().makeGlobal();

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        mockGps = new MockGps();
        bindingEngine = resolve(BindingEngine);
    });

    afterEach(() => {
        mockGps = undefined;
    });

    it("will return OK when the GPS is OK", (done) => {
        let location = new LocationRepository(mockGps as Gps, bindingEngine);

        mockGps.state = GpsState.OK;

        window.setTimeout(() => {
            expect(location.ok).toBeTruthy("for OK");
            expect(location.gpsPermissionDenied).toBeFalsy("for Permission Denied");
            expect(location.gpsUnavailable).toBeFalsy("for Unavailable");
            expect(location.gpsUnsupported).toBeFalsy("for Unsupported");
            done();
        }, 1);
    });

    it("will return OK when the GPS is Initialising", (done) => {
        let location = new LocationRepository(mockGps as Gps, bindingEngine);

        mockGps.state = GpsState.INITIALISING;

        window.setTimeout(() => {
            expect(location.ok).toBeTruthy("for OK");
            expect(location.gpsPermissionDenied).toBeFalsy("for Permission Denied");
            expect(location.gpsUnavailable).toBeFalsy("for Unavailable");
            expect(location.gpsUnsupported).toBeFalsy("for Unsupported");
            done();
        }, 1);
    });

    it("will return Permission Denied when GPS has Permission Denied", (done) => {
        let location = new LocationRepository(mockGps as Gps, bindingEngine);

        mockGps.state = GpsState.PERMISSION_DENIED;

        window.setTimeout(() => {
            expect(location.ok).toBeFalsy("for OK");
            expect(location.gpsPermissionDenied).toBeTruthy("for Permission Denied");
            expect(location.gpsUnavailable).toBeFalsy("for Unavailable");
            expect(location.gpsUnsupported).toBeFalsy("for Unsupported");
            done();
        }, 1);
    });


    it("will return Unavailable when the GPS is Unavailable", (done) => {
        let location = new LocationRepository(mockGps as Gps, bindingEngine);

        mockGps.state = GpsState.ERROR;

        window.setTimeout(() => {
            expect(location.ok).toBeFalsy("for OK");
            expect(location.gpsPermissionDenied).toBeFalsy("for Permission Denied");
            expect(location.gpsUnavailable).toBeTruthy("for Unavailable");
            expect(location.gpsUnsupported).toBeFalsy("for Unsupported");
            done();
        }, 1);
    });


    it("will return Unavailable when the GPS is Unavailable", (done) => {
        let location = new LocationRepository(mockGps as Gps, bindingEngine);

        mockGps.state = GpsState.POSITION_UNSUPPORTED;

        window.setTimeout(() => {
            expect(location.ok).toBeFalsy("for OK");
            expect(location.gpsPermissionDenied).toBeFalsy("for Permission Denied");
            expect(location.gpsUnavailable).toBeFalsy("for Unavailable");
            expect(location.gpsUnsupported).toBeTruthy("for Unsupported");
            done();
        }, 1);
    });

    it("will show changes in location from GPS", (done) => {
        let location = new LocationRepository(mockGps as Gps, bindingEngine);

        mockGps.state = GpsState.OK;
        mockGps.position = { coords: {longitude: 123, latitude: 456, heading:789, accuracy: 321}} as Position;

        window.setTimeout(() => {
            expect(location.location.longitude).toEqual(123);
            expect(location.location.latitude).toEqual(456);
            expect(location.location.heading).toEqual(789);
            expect(location.location.accuracy).toEqual(321);

            done();
        }, 1);
    });
});