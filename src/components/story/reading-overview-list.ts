import {Reading} from "../../resources/models/Reading";
import {bindable} from "aurelia-framework";
/**
 * Created by andy on 28/11/16.
 */

export class ReadingOverviewList{

    @bindable readings: Array<Reading>;

}