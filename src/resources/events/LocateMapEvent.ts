import {LocationInformation} from "../gps/LocationInformation";

export class LocateMapEvent {
    private _location: LocationInformation;

    constructor(location: LocationInformation) {
        this._location = location;
    }

    get location() {
        return this._location;
    }
}