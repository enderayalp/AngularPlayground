import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableCounter } from './observable-counter';

describe('ObservableCounter', () => {
  let component: ObservableCounter;
  let fixture: ComponentFixture<ObservableCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservableCounter],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservableCounter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
