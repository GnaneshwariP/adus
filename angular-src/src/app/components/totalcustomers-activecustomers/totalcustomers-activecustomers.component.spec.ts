import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalcustomersActivecustomersComponent } from './totalcustomers-activecustomers.component';

describe('TotalcustomersActivecustomersComponent', () => {
  let component: TotalcustomersActivecustomersComponent;
  let fixture: ComponentFixture<TotalcustomersActivecustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalcustomersActivecustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalcustomersActivecustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
