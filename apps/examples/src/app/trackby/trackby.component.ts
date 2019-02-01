import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Customer {
  id: number;
  name: string;
}

@Component({
  selector: 'app-trackby',
  templateUrl: './trackby.component.html',
  styleUrls: ['./trackby.component.scss']
})
export class TrackbyComponent {

  customers = [
    { id: 1, name: 'John Bailey' },
    { id: 2, name: 'Amelia Kerr' },
    { id: 3, name: 'Julian Wallace' },
    { id: 4, name: 'Pippa Sutherland' },
    { id: 5, name: 'Stephanie Simpson' },
    { id: 6, name: 'Sean Forsyth' },
    { id: 7, name: 'Jan Gray' },
    { id: 8, name: 'Harry Coleman' },
    { id: 9, name: 'Brandon Cameron' },
    { id: 10, name: 'Pippa Payne' },
    { id: 11, name: 'Ryan Churchill' },
    { id: 12, name: 'Lillian Ferguson' },
    { id: 13, name: 'Eric Pullman' },
    { id: 14, name: 'John Mathis' },
    { id: 15, name: 'Carol Parr' },
    { id: 16, name: 'Audrey Pullman' },
    { id: 17, name: 'Kevin Quinn' },
    { id: 18, name: 'Anthony Dyer' },
    { id: 19, name: 'Olivia Black' },
    { id: 20, name: 'Lily Young' },
    { id: 21, name: 'Jane Butler' },
    { id: 22, name: 'Alexander Fraser' },
    { id: 23, name: 'Vanessa Sutherland' },
    { id: 24, name: 'Jonathan Reid' },
    { id: 25, name: 'Carl Mitchell' },
    { id: 26, name: 'Charles Carr' },
    { id: 27, name: 'Tracey Harris' },
    { id: 28, name: 'Jan Bond' },
    { id: 29, name: 'Joseph Quinn' },
    { id: 30, name: 'Emma Greene' },
    { id: 31, name: 'Elizabeth Duncan' },
    { id: 32, name: 'John Langdon' },
    { id: 33, name: 'Kevin Hamilton' },
    { id: 34, name: 'Jack Mackay' },
    { id: 35, name: 'Connor Ross' },
    { id: 36, name: 'Christopher Grant' },
    { id: 37, name: 'William Walker' },
    { id: 38, name: 'Abigail Glover' },
    { id: 39, name: 'Rebecca Anderson' },
    { id: 40, name: 'Emma McGrath' },
    { id: 41, name: 'Evan Terry' },
    { id: 42, name: 'Olivia Short' },
    { id: 43, name: 'Dylan Bower' },
    { id: 44, name: 'Audrey Rampling' },
    { id: 45, name: 'Robert Edmunds' },
    { id: 46, name: 'Claire Wright' },
    { id: 47, name: 'Gordon Cameron' },
    { id: 48, name: 'Virginia Walker' },
    { id: 49, name: 'Colin Dickens' },
  ];

  customersObservable = new BehaviorSubject(this.customers);
  indexTrackFn = (index: number) => index;
  nameTrackFn = (_: number, item: Customer) => item.name;

  sortBy(prop: 'id' | 'name') {
    this.customersObservable.next(this.customers.map(s => ({ ...s })).sort((a, b) => {
      const aProp = a[prop], bProp = b[prop];
      if (aProp < bProp) {
        return -1;
      } else if (aProp > bProp) {
        return 1;
      }
      return 0;
    }));
  }
}
