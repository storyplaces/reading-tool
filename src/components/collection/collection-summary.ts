import {bindable, containerless} from "aurelia-framework";
import {Collection} from "../../resources/models/Collection";

/**
 * Created by andy on 28/11/16.
 */

@containerless()
export class CollectionSummary {

    @bindable collection: Collection;


}