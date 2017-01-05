import {TypeChecker} from "../../../../src/resources/utilities/TypeChecker";
import {CircleLocation} from "../../../../src/resources/models/locations/CircleLocation";
import {LocationHelper} from "../../../../src/resources/gps/LocationHelper";
import {LocationInformation} from "../../../../src/resources/gps/LocationInformation";

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

describe("CircleLocation", () => {

    let typeChecker = new TypeChecker;
    let locationHelper = new LocationHelper;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with data", () => {
        let circleLocation = new CircleLocation(typeChecker, locationHelper, {type:"circle"});

        expect(circleLocation instanceof CircleLocation).toBeTruthy();
    });

    it("can be created with no data", () => {
        let circleLocation = new CircleLocation(typeChecker, locationHelper);

        expect(circleLocation instanceof CircleLocation).toBeTruthy();
    });


    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new CircleLocation(typeChecker, locationHelper);

        expect(() => {
            model.fromObject([] as any)
        }).toThrow();

        expect(() => {
            model.fromObject("a" as any)
        }).toThrow();
    });

    it("can have its type set to circle", () => {
        let circleLocation = new CircleLocation(typeChecker, locationHelper);
        circleLocation.type = "circle";

        expect(circleLocation.type).toEqual("circle");
    });

    it("will throw an error if its type is set to something other than comparison", () => {
        let circleLocation = new CircleLocation(typeChecker, locationHelper);
        expect(() => {
            circleLocation.type = "somethingRandom"
        }).toThrow();
    });

    it("can have its lat set to a number", () => {
        let circleLocation = new CircleLocation(typeChecker, locationHelper);
        circleLocation.lat = 123;

        expect(circleLocation.lat).toEqual(123);
    });

    it("throw if its lat set to something other than a number", () => {
        let circleLocation = new CircleLocation(typeChecker, locationHelper);

        expect(() => {circleLocation.lat = "123" as any;}).toThrow();
    });

    it("can have its lon set to a number", () => {
        let circleLocation = new CircleLocation(typeChecker, locationHelper);
        circleLocation.lon = 123;

        expect(circleLocation.lon).toEqual(123);
    });

    it("throw if its lon set to something other than a number", () => {
        let circleLocation = new CircleLocation(typeChecker, locationHelper);

        expect(() => {circleLocation.lon = "123" as any;}).toThrow();
    });

    it("can have its radius set to a number", () => {
        let circleLocation = new CircleLocation(typeChecker, locationHelper);
        circleLocation.radius = 123;

        expect(circleLocation.radius).toEqual(123);
    });

    it("throw if its radius set to something other than a number", () => {
        let circleLocation = new CircleLocation(typeChecker, locationHelper);

        expect(() => {circleLocation.radius = "123" as any;}).toThrow();
    });

    describe("method withinBounds", () => {
        it("returns true when passed a location is within bounds", () => {
            let circleLocation = new CircleLocation(typeChecker, locationHelper, {id:"location", type: "circle", lat: 50.9360987, lon: -1.3961843, radius: 6});
            let result = circleLocation.withinBounds({latitude: 50.9361435, longitude: -1.3961910, accuracy:0, heading: 0});

            expect(result).toEqual(true);
        });

        it("returns false when passed a location outside the  bounds", () => {
            let circleLocation = new CircleLocation(typeChecker, locationHelper, {id:"location", type: "circle", lat: 50.9360987, lon: -1.3961843, radius: 6});
            let result = circleLocation.withinBounds({latitude: 50.9362792, longitude: -1.3962106, accuracy:0, heading: 0});

            expect(result).toEqual(false);
        });
    });

});