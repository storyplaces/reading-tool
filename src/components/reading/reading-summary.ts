import {Reading} from "../../resources/models/Reading";
import {bindable, containerless, computedFrom} from "aurelia-framework";
/**
 * Created by andy on 28/11/16.
 */

@containerless()
export class ReadingSummary{

    @bindable reading: Reading;
}