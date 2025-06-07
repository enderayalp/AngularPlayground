import { Component } from '@angular/core';
import { ObservableCounter } from '../../observable-demo/observable-counter';

@Component({
  selector: 'app-observable-overview',
  imports: [ObservableCounter],
  templateUrl: './observable-overview.html',
  styleUrl: './observable-overview.scss',
})
export class ObservableOverview {}
