import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, Renderer2, ViewChildren, QueryList, ElementRef, ViewContainerRef, Inject } from '@angular/core';
import { ModalConfiguration, ModalTemplate } from '@commons/modal';
import { ActionButtonType, ModalSize, ModalStatus, ActionButtonAlignment, MODAL_DATA } from '@commons/modal/src/modal/modal.model';
import { ModalComponent } from '@commons/modal/src/modal/modal.component';
import { ModalService } from '@commons/modal/src/modal.service';
import { ModalEntryComponent } from '../modal-entry/modal-entry.component';

@Component({
  selector: 'exm-modal-demo',
  templateUrl: './modal-demo.component.html'
  // styleUrls: ['./modal-demo.component.scss']
})
export class ModalDemoComponent implements OnInit, AfterViewInit {

  public configuration: ModalConfiguration;
  public header: ModalTemplate;
  public body: ModalTemplate;
  public footer: ModalTemplate;
  public status: ModalStatus;
  public btn;

  private components: ModalComponent[];
  @ViewChild(ModalComponent) private modalComponent: ModalComponent;
  @ViewChildren(ModalComponent) private component: QueryList<ModalComponent>;

  constructor(
    private service: ModalService,
    private view: ViewContainerRef,

  ) {
    this.configuration = new ModalConfiguration
    // this.configuration = {
    //   size: ModalSize.Large,

    //   contentHeight: '600px',
    //   height: '90%',
    //   maxHeight: '80%',
    //   width: '100%',
    //   maxWidth: '80%',
    //   actionButton: {
    //     isPositive: true,
    //     isNegative: true
    //   },
    //   actionButtonText: {
    //     positive: 'true',
    //     negative: 'false'
    //   },
    //   isDismissible: true,
    //   // isAutoDismissible: false,
    //   // autoDismissTimeOut: 5000,
    //   allowBackdrop: true
    // }
    this.header = ModalTemplate.Header;
    this.body = ModalTemplate.Body;
    this.footer = ModalTemplate.Footer;
    this.status = ModalStatus.Opened;

  }
  ngOnInit() {

  }
  ngAfterViewInit() {

    // this.components = this.component.toArray();
    // for (let index = 0; index < this.components.length; index++) {
    //   const promise = this.components[index].open();
    //   promise.then((res) => {
    //     console.log(res);

    //   });
    //   this.components[index].asyncStatus.then(
    //     result => console.log("parent result", result)

    //   ).catch(error => console.log("parent error", error)
    //   );

    // }

  }

  public initialized(value: boolean): void {
    console.log('parent initialized', value);
  }
  btnClick(el: ModalComponent) {
    // elRef.open();

    const a = this.service.open(ModalEntryComponent,{}, {});
    a.afterClosed().subscribe((re) => {
      console.log(re);
      this.btn = re
    })
    // const promise = el.open();
    // promise.then((res) => {
    //   console.log(res);

    // });
    // el.asyncStatus.then(
    //   result => console.log("parent result", result)

    // ).catch(error => console.log("parent error", error)
    // );

    // el.height = '200px';
    // // el.zindex = 100;
    // el.actionButtonAlignment = ActionButtonAlignment.Between;
    // this.modalComponent.width = '100%';
    // this.modalComponent.maxHeight = '100%';
    // this.modalComponent.maxWidth = '100%';
    // this.modalComponent.actionButton = {
    //   isPositive: false,
    //   isNegative: false


    // }
    // el.size = ModalSize.Small;
    // console.log(this.status);

  }
}
