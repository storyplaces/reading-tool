import {Story} from "../../resources/models/Story";
import {bindable,containerless} from "aurelia-framework";
/**
 * Created by andy on 28/11/16.
 */

@containerless()
export class CollapsiblePanel{

    @bindable title: string;
    @bindable id:string;

    get idRef() {
        return "#" + this.id;
    }
}