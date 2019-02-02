import { Component, OnInit } from '@angular/core';
import { OverrideService } from './override.service';

@Component({
  selector: 'exm-override-service-example',
  templateUrl: './override-service-example.component.html',
  styleUrls: ['./override-service-example.component.scss']
})
export class OverrideServiceExampleComponent implements OnInit {

  constructor(private service: OverrideService<Error>) { }

  ngOnInit() {
    this.service.info('information');
    this.service.warning('warning');
  }

}
