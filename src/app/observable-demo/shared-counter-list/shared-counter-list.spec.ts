import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCounterList } from './shared-counter-list';

describe('SharedCounterList', () => {
  let component: SharedCounterList;
  let fixture: ComponentFixture<SharedCounterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCounterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedCounterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
