import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPortalsComponent } from './all-portals.component';

describe('AllPortalsComponent', () => {
  let component: AllPortalsComponent;
  let fixture: ComponentFixture<AllPortalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPortalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPortalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
