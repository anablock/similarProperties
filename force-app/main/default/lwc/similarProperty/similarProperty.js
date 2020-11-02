import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

export default class SimilarProperty extends NavigationMixin(LightningElement) {
    @api item;

    @wire(CurrentPageReference) pageRef;

    navigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'lightningCommunity__Page',
                attributes: {
                    recordId: this.item.Id,
                    objectApiName: 'Property__c',
                    actionName: 'view'
                }
        })
    }
}