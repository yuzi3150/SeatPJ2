import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JockeyScrapingComponent } from './jockey-scraping.component';

describe('JockeyScrapingComponent', () => {
  let component: JockeyScrapingComponent;
  let fixture: ComponentFixture<JockeyScrapingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JockeyScrapingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JockeyScrapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
