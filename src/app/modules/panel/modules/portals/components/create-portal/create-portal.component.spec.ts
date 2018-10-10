import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePortalComponent } from './create-portal.component';

describe('CreatePortalComponent', () => {
  let component: CreatePortalComponent;
  let fixture: ComponentFixture<CreatePortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
