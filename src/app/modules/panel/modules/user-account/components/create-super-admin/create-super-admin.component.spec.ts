import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuperAdminComponent } from './create-super-admin.component';

describe('CreateSuperAdminComponent', () => {
  let component: CreateSuperAdminComponent;
  let fixture: ComponentFixture<CreateSuperAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSuperAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
