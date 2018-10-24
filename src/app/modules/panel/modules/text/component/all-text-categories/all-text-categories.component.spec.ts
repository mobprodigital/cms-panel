import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTextCategoriesComponent } from './all-text-categories.component';

describe('AllTextCategoriesComponent', () => {
  let component: AllTextCategoriesComponent;
  let fixture: ComponentFixture<AllTextCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTextCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTextCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
