import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalDemo } from './signal-demo.component';

describe('Signal', () => {
  let component: SignalDemo;
  let fixture: ComponentFixture<SignalDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
