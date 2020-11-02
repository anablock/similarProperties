import { LightningElement, api, track, wire } from 'lwc';
import findProperties from '@salesforce/apex/SimilarPropertyController.findProperties';

export default class SimilarProperties extends LightningElement {
    @api recordId;
 @track props;
 @track errorMsg;
			
 @wire(findProperties, { 
     recordId: '$recordId',
     priceRange: '100000'
 })
 props
}