import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAccesscodeComponent } from './generate-accesscode.component';

describe('GenerateAccesscodeComponent', () => {
  let component: GenerateAccesscodeComponent;
  let fixture: ComponentFixture<GenerateAccesscodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateAccesscodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAccesscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
