import { Component, ViewContainerRef, OnInit, Inject } from "@angular/core";
import { ModalServiceDemo } from "./modal-demo.service";
import { Observable, observable } from "rxjs";
import { ModalService } from "@commons/modal/src/modal.service";
import { MODAL_DATA } from "@commons/modal";
import { ModalContainerRef } from "@commons/modal/src/modal/container/modal-container-ref";

@Component({
    selector: 'exm-modal-entry',
    templateUrl: 'modal-entry.component.html'
})
export class ModalEntryComponent implements OnInit {
    name: string = 'default text';
    constructor(
        public modalRef: ModalContainerRef<ModalEntryComponent>,
        @Inject(MODAL_DATA) public data,
    ) {


    }
    ngOnInit() {
        // this.service.getName().subscribe((name) => {
        //     this.data.name = name;
        // });
        
    }
    onSave(){
        this.modalRef.close(this.data);
    }
}