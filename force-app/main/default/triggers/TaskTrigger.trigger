/*
* This trigger will not contain any business logic but would simply call the TaskTriggerHandler based on the event being fired
* All the business logic will reside in the respective apex class
*/

trigger TaskTrigger on Task (before insert, before update, after insert, after update) {
    
    TaskTriggerHandler handler = new TaskTriggerHandler();
    
    Triggers_Enable_Disable__mdt triggerMetadata =  [SELECT Is_Enable__c FROM Triggers_Enable_Disable__mdt WHERE DeveloperName = 'Task_Trigger' limit 1];
    
    if(triggerMetadata.Is_Enable__c){
        if(Trigger.isInsert && Trigger.isBefore) {
            //handler.OnBeforeInsert(trigger.new);
        }
        
        if(Trigger.isInsert && Trigger.isAfter){
            handler.OnAfterInsert(Trigger.new);
        }
        
        if(Trigger.isUpdate && Trigger.isBefore) {
            //handler.OnBeforeUpdate(trigger.new);
        }
        
        if(Trigger.isUpdate && Trigger.isAfter) {
            //handler.OnAfterUpdate(trigger.new);
        }
    }
    
}