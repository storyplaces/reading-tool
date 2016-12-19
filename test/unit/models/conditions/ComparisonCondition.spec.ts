import {TypeChecker} from "../../../../src/resources/utilities/TypeChecker";
import {ComparisonCondition} from "../../../../src/resources/models/conditions/ComparisonCondition";
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

describe("ComparisonCondition", () => {

    let typeChecker = new TypeChecker;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with data", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker, {type: "comparison"});

        expect(comparisonCondition instanceof ComparisonCondition).toBeTruthy();
    });

    it("can be created with no data", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);

        expect(comparisonCondition instanceof ComparisonCondition).toBeTruthy();
    });


    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new ComparisonCondition(typeChecker);

        expect(() => {
            model.fromObject([] as any)
        }).toThrow();

        expect(() => {
            model.fromObject("a" as any)
        }).toThrow();
    });

    it("can have its type set to comparison", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.type = "comparison";

        expect(comparisonCondition.type).toEqual("comparison");
    });

    it("will throw an error if its type is set to something other than comparison", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        expect(() => {
            comparisonCondition.type = "somethingRandom"
        }).toThrow();
    });

    //region aType
    it("can have its aType set to Integer", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.aType = "Integer";

        expect(comparisonCondition.aType).toEqual("Integer");
    });

    it("can have its aType set to String", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.aType = "String";

        expect(comparisonCondition.aType).toEqual("String");
    });

    it("can have its aType set to Integer", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.aType = "Variable";

        expect(comparisonCondition.aType).toEqual("Variable");
    });

    it("will throw an error if its aType is set to something other than a valid type", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        expect(() => {
            comparisonCondition.aType = "somethingRandom"
        }).toThrow();
    });
    //endregion

    //region bType
    it("can have its bType set to Integer", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.bType = "Integer";

        expect(comparisonCondition.bType).toEqual("Integer");
    });

    it("can have its bType set to String", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.bType = "String";

        expect(comparisonCondition.bType).toEqual("String");
    });

    it("can have its bType set to Integer", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.bType = "Variable";

        expect(comparisonCondition.bType).toEqual("Variable");
    });

    it("will throw an error if its bType is set to something other than a valid type", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        expect(() => {
            comparisonCondition.bType = "somethingRandom"
        }).toThrow();
    });
    //endregion

    //region a variable
    it("will throw an error if the a variable is set before aType", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        expect(() => {
            comparisonCondition.a = "Value"
        }).toThrow();
    });

    it("can have the a variable set as a string if aType is set to String", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.aType = "String";
        comparisonCondition.a = "value";

        expect(comparisonCondition.a).toEqual("value");
    });

    it("will throw an error if the a variable is not a string and aType is set to String", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.aType = "String";
        expect(() => {
            comparisonCondition.a = 1 as any;
        }).toThrow();
    });

    it("can have the a variable set as an integer if aType is set to Integer", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.aType = "Integer";
        comparisonCondition.a = "12";

        expect(comparisonCondition.a).toEqual("12");
    });

    it("will throw an error if the a variable is not an integer and aType is set to Integer", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.aType = "Integer";
        expect(() => {
            comparisonCondition.a = "value";
        }).toThrow();

        expect(() => {
            comparisonCondition.a = 12 as any;
        }).toThrow();
    });

    it("can have the a variable set as string (ie variable reference) a if aType is set to Variable", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.aType = "Variable";
        comparisonCondition.a = "12345ABC";

        expect(comparisonCondition.a).toEqual("12345ABC");
    });

    it("will throw an error if the a variable is not a string (ie variable reference) and aType is set to Variable", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.aType = "Variable";
        expect(() => {
            comparisonCondition.a = 1 as any;
        }).toThrow();
    });
    //region

    //region b variable
    it("will throw an error if the b variable is set before aType", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        expect(() => {
            comparisonCondition.b = "Value"
        }).toThrow();
    });

    it("can have the b variable set as a string if aType is set to String", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.bType = "String";
        comparisonCondition.b = "value";

        expect(comparisonCondition.b).toEqual("value");
    });

    it("will throw an error if the b variable is not a string and aType is set to String", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.bType = "String";
        expect(() => {
            comparisonCondition.b = 1 as any;
        }).toThrow();
    });

    it("can have the b variable set as an integer if aType is set to Integer", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.bType = "Integer";
        comparisonCondition.b = "12";

        expect(comparisonCondition.b).toEqual("12");
    });

    it("will throw an error if the b variable is not an integer and aType is set to Integer", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.bType = "Integer";
        expect(() => {
            comparisonCondition.b = "value";
        }).toThrow();

        expect(() => {
            comparisonCondition.b = 12 as any;
        }).toThrow();
    });

    it("can have the b variable set as string (ie variable reference) a if aType is set to Variable", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.bType = "Variable";
        comparisonCondition.b = "12345ABC";

        expect(comparisonCondition.b).toEqual("12345ABC");
    });

    it("will throw an error if the b variable is not a string (ie variable reference) and aType is set to Variable", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker);
        comparisonCondition.bType = "Variable";
        expect(() => {
            comparisonCondition.b = 1 as any;
        }).toThrow();
    });

    //region


});