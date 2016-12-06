/**
 * Created by kep1u13 on 06/12/2016.
 */
import {PagesMapViewSettings} from "../../../src/resources/models/PagesMapViewSettings";

describe("PagesMapViewSettings model", () => {

    it("can be instantiated with no data", () => {
        let model = new PagesMapViewSettings;

        expect(model.map).toBeUndefined();
        expect(model.pageArrows).toBeUndefined();
        expect(model.pageDistance).toBeUndefined();
    });

    it("can be instantiated with an object", () => {
        let data = {map: true, pageArrows: true, pageDistance: true};
        let model = new PagesMapViewSettings(data);

        expect(model.map).toEqual(true);
        expect(model.pageArrows).toEqual(true);
        expect(model.pageDistance).toEqual(true);
    });

    it("can have an anonymous object passed to it", () => {
        let data = {map: true, pageArrows: true, pageDistance: true};
        let model = new PagesMapViewSettings();
        model.fromObject(data);

        expect(model.map).toEqual(true);
        expect(model.pageArrows).toEqual(true);
        expect(model.pageDistance).toEqual(true);
    });

    it("will convert to JSON", () => {
        let data = {map: true, pageArrows: true, pageDistance: true};
        let model = new PagesMapViewSettings(data);

        let result = JSON.stringify(model);

        expect(result).toEqual('{"map":true,"pageArrows":true,"pageDistance":true}');
    });
});