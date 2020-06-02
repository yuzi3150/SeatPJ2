import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeibaComponent } from './keiba.component';

describe('KeibaComponent', () => {
  let component: KeibaComponent;
  let fixture: ComponentFixture<KeibaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeibaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeibaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
