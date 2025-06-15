import { Component } from '@angular/core';
import { ObservableCounter } from '../observable-counter/observable-counter';
import { ObservableCounterList } from '../observable-counter-list/observable-counter-list';
import { SharedCounterList } from '../shared-counter-list/shared-counter-list';

@Component({
  selector: 'app-observable-overview',
  imports: [ObservableCounter, ObservableCounterList, SharedCounterList],
  templateUrl: './observable-overview.html',
  styleUrl: './observable-overview.scss',
})
export class ObservableOverview {}
