import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicsComponent {
  items = Array(1000).fill(0).map(() => Math.round(Math.random() * 100));
}
