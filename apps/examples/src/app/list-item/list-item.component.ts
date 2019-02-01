import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'exm-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() item: any;
  @Output() itemSelected: EventEmitter<any>
  isActive: boolean;
  constructor() {
    this.itemSelected = new EventEmitter();
    this.isActive = false;
  }

  ngOnInit() {
  }

  setActive(value) {
    this.isActive = value
  }

  selectItem() {
    this.itemSelected.emit(this.item);
  }
}
