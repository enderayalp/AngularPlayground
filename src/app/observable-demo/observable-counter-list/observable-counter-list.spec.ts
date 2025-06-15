import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableCounterList } from './observable-counter-list';

describe('SharedCounterList', () => {
  let component: ObservableCounterList;
  let fixture: ComponentFixture<ObservableCounterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservableCounterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableCounterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
