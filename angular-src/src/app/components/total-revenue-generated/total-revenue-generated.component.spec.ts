import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRevenueGeneratedComponent } from './total-revenue-generated.component';

describe('TotalRevenueGeneratedComponent', () => {
  let component: TotalRevenueGeneratedComponent;
  let fixture: ComponentFixture<TotalRevenueGeneratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalRevenueGeneratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRevenueGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
