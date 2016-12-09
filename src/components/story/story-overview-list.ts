import {Story} from "../../resources/models/Story";
import {bindable} from "aurelia-framework";
/**
 * Created by andy on 28/11/16.
 */

export class StoryOverviewList{

    @bindable stories: Array<Story>;

}