import { Routes } from '@angular/router';
import { ObservableOverview } from './observable-demo/observable-overview/observable-overview';
import {SignalDemo} from './signal-demo/signal-demo.component';
import {CustomTable} from './table-demo/custom-table';

export const routes: Routes = [{ path: '', component: ObservableOverview, pathMatch: 'full' }
,{path: 'signal-demo', component:SignalDemo},
  {path: 'table-demo', component:CustomTable}];
