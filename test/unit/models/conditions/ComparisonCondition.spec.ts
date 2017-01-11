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
import {TypeChecker} from "../../../../src/resources/utilities/TypeChecker";
import {ComparisonCondition} from "../../../../src/resources/models/conditions/ComparisonCondition";
import {Container} from "aurelia-framework";
import {LocationCollection} from "../../../../src/resources/collections/LocationCollection";
import {VariableCollection} from "../../../../src/resources/collections/VariableCollection";
import {ConditionCollection} from "../../../../src/resources/collections/ConditionCollection";
import {LocationInformation} from "../../../../src/resources/gps/LocationInformation";

describe("ComparisonCondition", () => {

    let typeChecker = new TypeChecker;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with data", () => {
        let comparisonCondition = new ComparisonCondition(typeChecker, {});

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

    describe("parameter operand", () => {
        it("can be set to a valid value", () => {
            let comparisonCondition = new ComparisonCondition(typeChecker);

            comparisonCondition.operand = "==";
            expect(comparisonCondition.operand).toEqual("==");

            comparisonCondition.operand = "!=";
            expect(comparisonCondition.operand).toEqual("!=");

            comparisonCondition.operand = ">";
            expect(comparisonCondition.operand).toEqual(">");

            comparisonCondition.operand = "<";
            expect(comparisonCondition.operand).toEqual("<");

            comparisonCondition.operand = ">=";
            expect(comparisonCondition.operand).toEqual(">=");

            comparisonCondition.operand = "<=";
            expect(comparisonCondition.operand).toEqual("<=");
        });

        it("will throw when set to something other than a valid operand string", () => {
            let comparisonCondition = new ComparisonCondition(typeChecker);

            expect(() => {
                comparisonCondition.operand = "abc";
            }).toThrow();
        });

        it("will throw when set to something other than a string", () => {
            let comparisonCondition = new ComparisonCondition(typeChecker);

            expect(() => {
                comparisonCondition.operand = 1 as any;
            }).toThrow();
        });
    });

    describe("method execute", () => {
        let container: Container = new Container().makeGlobal();
        let variables = container.invoke(VariableCollection, [[
            {id: "variable1", value: "1"},
            {id: "variable2", value: "2"},
            {id: "variable100", value: "100"},
            {id: "variablea", value: "a"},
            {id: "variableb", value: "b"},
            {id: "variablebb", value: "bb"}
        ]]);
        let condition: ComparisonCondition;

        describe("compares two numbers", () => {
            it("are equal", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "1", operand: "=="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "2", operand: "=="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("not equal", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "2", operand: "!="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "1", operand: "!="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is greater than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "2", bType: "Integer", b: "1", operand: ">"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "2", bType: "Integer", b: "100", operand: ">"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "1", operand: ">"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one  is less than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "2", operand: "<"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "100", bType: "Integer", b: "2", operand: "<"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "1", operand: "<"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is greater than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "1", operand: ">="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "2", bType: "Integer", b: "1", operand: ">="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "2", bType: "Integer", b: "100", operand: ">="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "2", operand: ">="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is less than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "1", operand: "<="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Integer", b: "2", operand: "<="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "100", bType: "Integer", b: "2", operand: "<="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "2", bType: "Integer", b: "1", operand: "<="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });
        });

        describe("compares a number and a numeric variable", () => {
            it("are equal", () => {
                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "variable1",
                    operand: "=="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "variable2",
                    operand: "=="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "doesNotExist",
                    operand: "=="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("not equal", () => {
                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "variable2",
                    operand: "!="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "variable1",
                    operand: "!="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "doesNotExist",
                    operand: "!="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);
            });

            it("where one is greater than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1",  aType: "Integer", a: "2", bType: "Variable", b: "variable1", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "2",
                    bType: "Variable",
                    b: "variable100",
                    operand: ">"
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Variable", b: "variable1", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", type: "comparison", aType: "Integer", a: "1", bType: "Variable", b: "doesNotExist", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one  is less than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Variable", b: "variable2", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "100",
                    bType: "Variable",
                    b: "variable2",
                    operand: "<"
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Integer", a: "1", bType: "Variable", b: "variable1", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", type: "comparison", aType: "Integer", a: "1", bType: "Variable", b: "doesNotExist", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is greater than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "variable1",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "2",
                    bType: "Variable",
                    b: "variable1",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "2",
                    bType: "Variable",
                    b: "variable100",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "variable2",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "doesNotExist",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is less than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "variable1",
                    operand: "<="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "1",
                    bType: "Variable",
                    b: "variable2",
                    operand: "<="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "100",
                    bType: "Variable",
                    b: "variable2",
                    operand: "<="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Integer",
                    a: "2",
                    bType: "Variable",
                    b: "variable1",
                    operand: "<="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Integer",
                    a: "2",
                    bType: "Variable",
                    b: "doesNotExist",
                    operand: "<="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });
        });

        describe("compares a numeric variable and a number", () => {
            it("are equal", () => {
                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    bType: "Integer",
                    b: "1",
                    aType: "Variable",
                    a: "variable1",
                    operand: "=="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    bType: "Integer",
                    b: "1",
                    aType: "Variable",
                    a: "variable2",
                    operand: "=="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    bType: "Integer",
                    b: "1",
                    aType: "Variable",
                    a: "doesNotExist",
                    operand: "=="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("not equal", () => {
                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    bType: "Integer",
                    b: "1",
                    aType: "Variable",
                    a: "variable2",
                    operand: "!="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    bType: "Integer",
                    b: "1",
                    aType: "Variable",
                    a: "variable1",
                    operand: "!="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    bType: "Integer",
                    b: "1",
                    aType: "Variable",
                    a: "doesNotExist",
                    operand: "!="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);
            });

            it("where one is greater than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variable2", bType: "Integer", b: "1", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Variable",
                    a: "variable2",
                    bType: "Integer",
                    b: "100",
                    operand: ">"
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variable1", bType: "Integer", b: "1", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", type: "comparison", aType: "Variable", a: "doesNotExist", bType: "Integer", b: "1", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is less than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variable1", bType: "Integer", b: "2", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Variable",
                    a: "variable100",
                    bType: "Integer",
                    b: "2",
                    operand: "<"
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variable1", bType: "Integer", b: "1", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", type: "comparison", aType: "Variable", a: "doesNotExist", bType: "Integer", b: "1", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is greater than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Variable",
                    a: "variable1",
                    bType: "Integer",
                    b: "1",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Variable",
                    a: "variable2",
                    bType: "Integer",
                    b: "1",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Variable",
                    a: "variable2",
                    bType: "Integer",
                    b: "100",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Variable",
                    a: "variable1",
                    bType: "Integer",
                    b: "2",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Variable",
                    a: "doesNotExist",
                    bType: "Integer",
                    b: "2",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is less than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Variable",
                    a: "variable1",
                    bType: "Integer",
                    b: "1",
                    operand: "<="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Variable",
                    a: "variable1",
                    bType: "Integer",
                    b: "2",
                    operand: "<="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Variable",
                    a: "variable100",
                    bType: "Integer",
                    b: "2",
                    operand: "<="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    aType: "Variable",
                    a: "variable2",
                    bType: "Integer",
                    b: "1",
                    operand: "<="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Variable",
                    a: "doesNotExist",
                    bType: "Integer",
                    b: "1",
                    operand: "<="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });
        });

        describe("compares two strings", () => {
            it("are equal", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "String", b: "a", operand: "=="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "String", b: "b", operand: "=="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("not equal", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "String", b: "b", operand: "!="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "String", b: "a", operand: "!="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is greater than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "String", b: "a", operand: ">"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "String", b: "bb", operand: ">"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "String", b: "b", operand: ">"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is less than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "String", b: "b", operand: "<"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "bb", bType: "String", b: "b", operand: "<"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "String", b: "a", operand: "<"});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is greater than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "String", b: "a", operand: ">="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "String", b: "a", operand: ">="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "String", b: "bb", operand: ">="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "String", b: "b", operand: ">="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is less than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "String", b: "b", operand: "<="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "String", b: "a", operand: "<="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "bb", bType: "String", b: "b", operand: "<="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "String", b: "a", operand: "<="});
                expect(condition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });
        });

        describe("compares a string and a string variable", () => {
            it("are equal", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "Variable", b: "variablea", operand: "=="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "Variable", b: "variableb", operand: "=="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", type: "comparison", aType: "String", a: "a", bType: "Variable", b: "doesNotExist", operand: "=="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("not equal", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "Variable", b: "variableb", operand: "!="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "Variable", b: "variablea", operand: "!="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", type: "comparison", aType: "String", a: "a", bType: "Variable", b: "doesNotExist", operand: "!="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);
            });

            it("where one is greater than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "Variable", b: "variablea", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "Variable", b: "variablebb", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "Variable", b: "variableb", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", type: "comparison", aType: "String", a: "a", bType: "Variable", b: "doesNotExist", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is less than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "Variable", b: "variableb", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "bb", bType: "Variable", b: "variableb", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "Variable", b: "variablea", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", type: "comparison", aType: "String", a: "b", bType: "Variable", b: "doesNotExist", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is greater than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "Variable", b: "variablea", operand: ">="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "Variable", b: "variablea", operand: ">="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "Variable", b: "variablebb", operand: ">="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "Variable", b: "variableb", operand: ">="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", type: "comparison", aType: "String", a: "a", bType: "Variable", b: "doesNotExist", operand: ">="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is less than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "Variable", b: "variableb", operand: "<="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "a", bType: "Variable", b: "variablea", operand: "<="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "bb", bType: "Variable", b: "variableb", operand: "<="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "String", a: "b", bType: "Variable", b: "variablea", operand: "<="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", type: "comparison", aType: "String", a: "b", bType: "Variable", b: "doesNotExist", operand: "<="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });
        });

        describe("compares a string variable and a string", () => {
            it("are equal", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablea", bType: "String", b: "a", operand: "=="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablea", bType: "String", b: "b", operand: "=="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Variable",
                    a: "doesNotExist",
                    bType: "String",
                    b: "b",
                    operand: "=="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("not equal", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablea", bType: "String", b: "b", operand: "!="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablea", bType: "String", b: "a", operand: "!="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Variable",
                    a: "doesNotExist",
                    bType: "String",
                    b: "a",
                    operand: "!="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);
            });

            it("where one is greater than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variableb", bType: "String", b: "a", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variableb", bType: "String", b: "bb", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablea", bType: "String", b: "b", operand: ">"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Variable",
                    a: "doesNotExist",
                    bType: "String",
                    b: "b",
                    operand: ">"
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is less than the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablea", bType: "String", b: "b", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablebb", bType: "String", b: "b", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variableb", bType: "String", b: "a", operand: "<"});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Variable",
                    a: "doesNotExist",
                    bType: "String",
                    b: "a",
                    operand: "<"
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is greater than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablea", bType: "String", b: "a", operand: ">="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variableb", bType: "String", b: "a", operand: ">="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variableb", bType: "String", b: "bb", operand: ">="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablea", bType: "String", b: "b", operand: ">="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {
                    id: "condition1",
                    type: "comparison",
                    aType: "Variable",
                    a: "doesNotExist",
                    bType: "String",
                    b: "b",
                    operand: ">="
                });
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });

            it("where one is less than or equal to the other", () => {
                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablea", bType: "String", b: "b", operand: "<="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablea", bType: "String", b: "a", operand: "<="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(true);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variablebb", bType: "String", b: "b", operand: "<="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "variableb", bType: "String", b: "a", operand: "<="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);

                condition = new ComparisonCondition(typeChecker, {id: "condition1", aType: "Variable", a: "doesNotExist", bType: "String", b: "a", operand: "<="});
                expect(condition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation)).toEqual(false);
            });
        });
    });
});