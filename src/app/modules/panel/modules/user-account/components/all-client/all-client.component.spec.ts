import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientComponent } from './all-client.component';

describe('AllClientComponent', () => {
  let component: AllClientComponent;
  let fixture: ComponentFixture<AllClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
