import { Routes } from '@angular/router';
import { ObservableOverview } from './observable-demo/observable-overview/observable-overview';
import {SignalDemo} from './signal-demo/signal-demo.component';

export const routes: Routes = [{ path: '', component: ObservableOverview, pathMatch: 'full' }
,{path: 'signal-demo', component:SignalDemo, pathMatch: 'full'}];
