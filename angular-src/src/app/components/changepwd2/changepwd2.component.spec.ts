import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Changepwd2Component } from './changepwd2.component';

describe('Changepwd2Component', () => {
  let component: Changepwd2Component;
  let fixture: ComponentFixture<Changepwd2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Changepwd2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Changepwd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
