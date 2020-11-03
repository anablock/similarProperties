import { LightningElement, api, track, wire } from 'lwc';
import findProperties from '@salesforce/apex/SimilarPropertyController.findProperties';
import { getRecord } from 'lightning/uiRecordApi';
import { subscribe, createMessageContext, releaseMessageContext } from 'lightning/messageService';
import MESSAGE_CHANNEL from "@salesforce/messageChannel/Properties__c";
import { refreshApex } from '@salesforce/apex';

// an array to define which fields to retrieve
const fields = [
    'Property__c.Name',
    'Property__c.Price__c',
    'Property__c.Status__c',
    'Property__c.Beds__c',
    'Property__c.Broker__c',
]

export default class SimilarProperties extends LightningElement {
    
    @api recordId;
    
    // tracked fields
    @track props;
    @track errorMsg;
    @track property;
    @track price;
    @track beds;
    context = createMessageContext();
    subscription = null;
			
    // retrieve the desired fields for the current record
    @wire(getRecord, {recordId: '$recordId', fields})
    wiredProperty(value) {
        if(value.data) {
            this.property = value.data;
            this.price = this.property.fields.Price__c.value;
            this.beds = this.property.fields.Beds__c.value;
        } else if (value.error){
            console.log('OOPS: ', value.error)
        }
    }
    
    @wire(findProperties, { 
        recordId: '$recordId',
        priceRange: '100000'
    })
    props

    // called when the element is inserted in the document
    connectedCallback() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.context, MESSAGE_CHANNEL, (message) => {
            this.refreshSelection(message);
        })
    }

    
}