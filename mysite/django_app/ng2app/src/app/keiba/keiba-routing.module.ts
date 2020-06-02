import { JockeyScrapingComponent } from './jockey-scraping/jockey-scraping.component';
import { HorseScrapingComponent } from './horse-scraping/horse-scraping.component';
import { RaceListComponent } from './race-list/race-list.component';
import { RaceComponent } from './race/race.component';
import { HomeComponent } from './home/home.component';
import { WebScrapingComponent } from './web-scraping/web-scraping.component';
import { KeibaComponent } from './keiba.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: KeibaComponent,
        children: [
            { path: 'web-scraping', component: WebScrapingComponent },
            { path: 'race-list', component: RaceListComponent },
            { path: 'home', component: HomeComponent },
            { path: 'race', component: RaceComponent },
            { path: 'horse-scraping', component: HorseScrapingComponent },
            { path: 'jockey-scraping', component: JockeyScrapingComponent },

        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KeibasRoutingModule { }