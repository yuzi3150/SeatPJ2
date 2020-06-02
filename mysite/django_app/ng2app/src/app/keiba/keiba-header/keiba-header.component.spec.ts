import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeibaHeaderComponent } from './keiba-header.component';

describe('KeibaHeaderComponent', () => {
  let component: KeibaHeaderComponent;
  let fixture: ComponentFixture<KeibaHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeibaHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeibaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
