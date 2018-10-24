import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTextCategoryComponent } from './add-text-category.component';

describe('AddTextCategoryComponent', () => {
  let component: AddTextCategoryComponent;
  let fixture: ComponentFixture<AddTextCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTextCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTextCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
