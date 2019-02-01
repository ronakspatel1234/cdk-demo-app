import { Component, ViewChild, ElementRef, ChangeDetectorRef, NgZone, ViewChildren, QueryList } from '@angular/core';
import { FocusMonitor, FocusOrigin, ListKeyManager, FocusTrapFactory } from '@angular/cdk/a11y';
import { ListItemComponent } from '../list-item/list-item.component';
import { DOWN_ARROW, UP_ARROW, ENTER } from '@angular/cdk/keycodes';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'exm-color',
  templateUrl: './color-demo.component.html',
  styleUrls: ['./color-demo.component.css']
})

export class ColorDemoComponent {

  // stores the list items
  list: string[];
  // stores the selected item
  selectedItem: string;
  // keyboard manager which will react to the keyboard event for specified keys.
  keyboardEventManager: ListKeyManager<any>;
  // status of the list's visibility
  isListVisible: boolean;

  @ViewChildren(ListItemComponent) listItems: QueryList<ListItemComponent>;

  @ViewChild('element') element: ElementRef<HTMLElement>;
  @ViewChild('trapper', { read: ElementRef }) trapper: ElementRef;
  @ViewChild('myList', { read: ElementRef }) myList: ElementRef;

  // stores the reference of the overlay origin (button that triggers the dropdown)
  @ViewChild(CdkOverlayOrigin) cdkOverlayOrigin: CdkOverlayOrigin;

  elementOrigin = this.formatOrigin(null);

  constructor(private focusMonitor: FocusMonitor,
    private focusTrap: FocusTrapFactory,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone) {
    this.list = ["list item 1", "list item 2", "list item 3", "list item 4", "list item 5", "list item 6"];
  }
  
  ngOnInit() {
    this.focusMonitor.monitor(this.element)
      .subscribe(origin => this.ngZone.run(() => {
        this.elementOrigin = this.formatOrigin(origin);
        this.cdr.markForCheck();
      }));

  }

  ngAfterViewInit() {
    this.keyboardEventManager = new ListKeyManager<any>(this.listItems).withWrap();
    this.initKeyManagerHandlers();
    const focusTrap = this.focusTrap.create(this.trapper.nativeElement);
    focusTrap.focusInitialElement();
    this.cdr.detectChanges();
  }

  showList() {
    this.isListVisible = true;
  }

  hideList() {
    this.isListVisible = false;
  }

  /**
   * @desc Listens to the active navigation item on the keyboardEventsManager instance
   * and triggers the provided function with the active item index
   */
  initKeyManagerHandlers() {
    this.keyboardEventManager
      .change
      .subscribe((activeIndex) => {
        // when the navigation item changes, we get new activeIndex
        this.listItems.map((item, index) => {
          // set the isActive `true` for the appropriate list item and `false` for the rest
          item.setActive(activeIndex === index);
          return item;
        });
      });
  }

  /**
   * keyUp event for accessibility
   */
  handleKeyUp(event: KeyboardEvent) {
    event.stopPropagation();
    if (this.keyboardEventManager) {
      if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
        this.keyboardEventManager.onKeydown(event);
        return false;
      } else if (event.keyCode === ENTER) {
        this.keyboardEventManager.activeItem.selectItem();
        return false;
      }
    }
  }

  onSelectItem(event) {
    this.selectedItem = event;
  }
  selectedColor = { name: 'Indigo', value: '#3F51B5' };

  colors = [
    { name: 'Red', value: '#F44336' },
    { name: 'Pink', value: '#E91E63' },
    { name: 'Purple', value: '#9C27B0' },
    { name: 'Deep Purple', value: '#673AB7' },
    this.selectedColor,
    { name: 'Blue', value: '#2196F3' },
    { name: 'Light Blue', value: '#03A9F4' },
    { name: 'Cyan', value: '#00BCD4' },
    { name: 'Teal', value: '#009688' },
    { name: 'Green', value: '#4CAF50' },
    { name: 'Light Green', value: '#8BC34A' },
    { name: 'Lime', value: '#CDDC39' },
    { name: 'Yellow', value: '#FFEB3B' },
    { name: 'Amber', value: '#FFC107' },
    { name: 'Orange', value: '#FF9800' },
    { name: 'Deep Orange', value: '#FF5722' },
    { name: 'Brown', value: '#795548' },
    { name: 'Grey', value: '#9E9E9E' },
    { name: 'Blue Grey', value: '#607D8B' }
  ];

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.element);
  }

  formatOrigin(origin: FocusOrigin): string {
    return origin ? origin + ' focused' : 'blurred';
  }

  markForCheck() {
    this.ngZone.run(() => this.cdr.markForCheck());
  }
}
