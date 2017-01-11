import {Page} from "../../resources/models/Page";
import {bindable, containerless} from "aurelia-framework";
/**
 * Created by andy on 28/11/16.
 */

@containerless()
export class PageSummary{

    @bindable page: Page;

}