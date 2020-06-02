import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseScrapingComponent } from './horse-scraping.component';

describe('HorseScrapingComponent', () => {
  let component: HorseScrapingComponent;
  let fixture: ComponentFixture<HorseScrapingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorseScrapingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseScrapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
