import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { SpecDataService } from './spec-data.service';

@Component({
  selector: 'app-spec-data',
  templateUrl: './spec-data.component.html',
  styleUrls: ['./spec-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecDataComponent {
  dataSource = new MyDataSource(this.api);


  constructor(public api: SpecDataService) {
  }
}

export class MyDataSource extends DataSource<any> {
  private PAGE_SIZE = 10;
  public data: any;
  private fetchedPages = new Set<number>();

  // private cachedData = Array.from<string>({ length: 1000 });
  private dataStream = new BehaviorSubject<(any)[]>([]);

  private subscription = new Subscription();
  constructor(private api: SpecDataService) {
    super();
    this.getData();
  }
  getData() {
    this.api.getDate()
      .subscribe((photos) => {
        this.data = photos;
        this.dataStream.next(this.data);
      });

  }
  connect(collectionViewer: CollectionViewer): Observable<(any)[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end);
      for (let i = startPage; i <= endPage; i++) {
        this.fetchPage(i);
      }
    }));

    return this.dataStream;
  }
  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.PAGE_SIZE);
  }

  private fetchPage(page: number) {

    if (this.fetchedPages.has(page)) {
      return;
    }
    this.getData();
    this.fetchedPages.add(page);
  }
}

