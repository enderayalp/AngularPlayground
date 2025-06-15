import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomObservable } from './custom-observable';

describe('CustomObservable', () => {
  let component: CustomObservable;
  let fixture: ComponentFixture<CustomObservable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomObservable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomObservable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
