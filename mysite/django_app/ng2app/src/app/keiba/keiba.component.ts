import { Component, OnInit } from '@angular/core';
import { KeibasRoutingModule } from './keiba-routing.module';
import { KeibaService } from './keiba.service';

@Component({
  selector: 'app-keiba',
  templateUrl: './keiba.component.html',
  styleUrls: ['./keiba.component.css']
})
export class KeibaComponent implements OnInit {
  constructor(private keibaservice:KeibaService) { }
  ngOnInit(): void {
  }

}
