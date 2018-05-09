import {Reading} from "../../resources/models/Reading";
import {bindable, containerless, computedFrom} from "aurelia-framework";
import moment = require('moment');


@containerless()
export class ReadingSummary{

    @bindable reading: Reading;

    @computedFrom('reading.timestamp')
    get createTime() {
        if (!this.reading) {
            return "";
        }

        return moment.unix(this.reading.timestamp).fromNow();
    }
}