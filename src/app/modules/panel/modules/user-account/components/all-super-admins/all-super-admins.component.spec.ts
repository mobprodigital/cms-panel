import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSuperAdminsComponent } from './all-super-admins.component';

describe('AllSuperAdminsComponent', () => {
  let component: AllSuperAdminsComponent;
  let fixture: ComponentFixture<AllSuperAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSuperAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSuperAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
