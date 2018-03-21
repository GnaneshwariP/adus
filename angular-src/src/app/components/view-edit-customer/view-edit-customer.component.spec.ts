import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditCustomerComponent } from './view-edit-customer.component';

describe('ViewEditCustomerComponent', () => {
  let component: ViewEditCustomerComponent;
  let fixture: ComponentFixture<ViewEditCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
