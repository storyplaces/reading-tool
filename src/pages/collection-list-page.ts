import {autoinject} from "aurelia-framework";
import {CollectionConnector} from "../resources/store/CollectionConnector";
import {Collection} from "../resources/models/Collection";

@autoinject
export class CollectionListPage {

    private collections: Array<Collection>;
    private loading: boolean;

    constructor(private collectionConnector: CollectionConnector) {
    }

    activate() {
        this.loading = false;
        this.refresh();
    }

    refresh() {
        this.loading = true;
        return this.collectionConnector.fetchAll()
            .then(() => {
               this.collections = this.collectionConnector.all;
               this.loading = false;
            });
    }
}