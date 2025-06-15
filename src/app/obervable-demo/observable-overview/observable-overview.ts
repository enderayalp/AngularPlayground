import { Component } from '@angular/core';
import { ObservableCounter } from '../../observable-demo/observable-counter/observable-counter';
import { ObservableCounterList } from '../../observable-demo/observable-counter-list/observable-counter-list';
import { SharedCounterList } from '../../observable-demo/shared-counter-list/shared-counter-list';

@Component({
  selector: 'app-observable-overview',
  imports: [ObservableCounter, ObservableCounterList, SharedCounterList],
  templateUrl: './observable-overview.html',
  styleUrl: './observable-overview.scss',
})
export class ObservableOverview {}
