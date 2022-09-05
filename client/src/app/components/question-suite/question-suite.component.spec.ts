import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSuiteComponent } from './question-suite.component';

describe('QuestionSuiteComponent', () => {
  let component: QuestionSuiteComponent;
  let fixture: ComponentFixture<QuestionSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionSuiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
