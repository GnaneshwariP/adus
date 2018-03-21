import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesscodeHistoryComponent } from './accesscode-history.component';

describe('AccesscodeHistoryComponent', () => {
  let component: AccesscodeHistoryComponent;
  let fixture: ComponentFixture<AccesscodeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesscodeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesscodeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
