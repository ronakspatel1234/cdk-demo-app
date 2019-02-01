import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'exm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  matcher: MediaQueryList;
  constructor(public breakpointObserver: BreakpointObserver,
    public mediaMatcher: MediaMatcher) {

  }

  ngOnInit() {
    // this.breakpointObserver
    //   .observe(['(min-width: 500px)'])
    //   .subscribe((state: BreakpointState) => {
    //     if (state.matches) {
    //       console.log('Viewport is 500px or over!');
    //     } else {
    //       console.log('Viewport is getting smaller!');
    //     }
    //   });
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log(
            'Matches small viewport or handset in portrait mode'
          );
        }
      });

    this.matcher = this.mediaMatcher.matchMedia('(min-width: 500px)');

    this.matcher.addListener(this.myListener);
  }

  myListener(event) {
    console.log(event.matches ? 'match' : 'no match');
  }
}







