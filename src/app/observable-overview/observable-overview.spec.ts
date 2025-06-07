import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableOverview } from './observable-overview';

describe('ObservableOverview', () => {
  let component: ObservableOverview;
  let fixture: ComponentFixture<ObservableOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservableOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservableOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
