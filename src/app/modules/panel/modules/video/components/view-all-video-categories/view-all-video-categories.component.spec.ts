import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllVideoCategoriesComponent } from './view-all-video-categories.component';

describe('ViewAllVideoCategoriesComponent', () => {
  let component: ViewAllVideoCategoriesComponent;
  let fixture: ComponentFixture<ViewAllVideoCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllVideoCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllVideoCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
