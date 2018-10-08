import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllVideosComponent } from './view-all-videos.component';

describe('ViewAllVideosComponent', () => {
  let component: ViewAllVideosComponent;
  let fixture: ComponentFixture<ViewAllVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
