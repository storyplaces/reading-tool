/**
 * Created by andy on 28/11/16.
 */
import {autoinject} from "aurelia-framework";
import {Authenticator} from "../resources/auth/Authenticator";

@autoinject()
export class AboutPage {
    userId: string = "";

    constructor(private auth: Authenticator) {
        this.userId = auth.userId;
    }
}