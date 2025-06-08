import { Component } from '@angular/core';
import { ObservableCounter } from '../../observable-demo/observable-counter/observable-counter';
import {ObservableCounterList} from '../../observable-demo/pbservable-counter-list/observable-counter-list';

@Component({
  selector: 'app-observable-overview',
  imports: [ObservableCounter, ObservableCounterList],
  templateUrl: './observable-overview.html',
  styleUrl: './observable-overview.scss',
})
export class ObservableOverview {}
