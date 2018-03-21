import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRechargehistoryComponent } from './customer-rechargehistory.component';

describe('CustomerRechargehistoryComponent', () => {
  let component: CustomerRechargehistoryComponent;
  let fixture: ComponentFixture<CustomerRechargehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRechargehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRechargehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
