/**
 * @author Ronak Patel
 * @class GetTemplateComponent
 * @description A directive that will be used to override the template of the modal with the template that was passed inside this directive.
 */

import { Directive, TemplateRef, Input } from '@angular/core';
// --------------------------------------------- //
// your app specific imports statements

@Directive({
    selector: '[cmnModalTemplate]'
})

export class GetModalDirective {
    
    @Input('cmnModalTemplate') templateInput: string;
    constructor(private templateRef: TemplateRef<any>) {
        this.getTemplate();
     }

    /**
     * @description A method that will return a template reference of the modal.
     */
    public getTemplate() {
        return {
            templateRef: this.templateRef,
            templateInput: this.templateInput
        }
    }
}
