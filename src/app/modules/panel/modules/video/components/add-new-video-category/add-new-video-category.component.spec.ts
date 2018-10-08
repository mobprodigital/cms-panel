import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVideoCategoryComponent } from './add-new-video-category.component';

describe('AddNewVideoCategoryComponent', () => {
  let component: AddNewVideoCategoryComponent;
  let fixture: ComponentFixture<AddNewVideoCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewVideoCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVideoCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
