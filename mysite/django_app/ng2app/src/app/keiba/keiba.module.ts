import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from './../material.module';
import { KeibaHeaderComponent } from './keiba-header/keiba-header.component';
import { HorseSearchComponent } from './horse-search/horse-search.component';
import { WebScrapingComponent } from './web-scraping/web-scraping.component';
import { KeibaComponent } from './keiba.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { KeibasRoutingModule } from './keiba-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RaceComponent } from './race/race.component';
import { RaceListComponent } from './race-list/race-list.component';
import { JockeyScrapingComponent } from './jockey-scraping/jockey-scraping.component';
import { HorseScrapingComponent } from './horse-scraping/horse-scraping.component';



@NgModule({
  declarations: [
    KeibaComponent,
    HomeComponent,
    WebScrapingComponent,
    HorseSearchComponent,
    KeibaHeaderComponent,
    RaceComponent,
    RaceListComponent,
    JockeyScrapingComponent,
    HorseScrapingComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    KeibasRoutingModule,
    AgGridModule.withComponents([]),
  ],
})
export class KeibaModule { }
