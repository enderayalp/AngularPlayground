import {Component, OnDestroy, signal, Signal, WritableSignal} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';

export interface Counter {
  counter: WritableSignal<number>;
  isRunning: WritableSignal<boolean>;
}

@Component({
  selector: 'app-observable-counter-list',
  imports: [MatButton],
  templateUrl: './observable-counter-list.html',
  styleUrl: './observable-counter-list.scss',
})
export class ObservableCounterList implements OnDestroy {
  protected readonly counters: Signal<Counter>[] = [];
  protected readonly disableButton = signal(false);
  private subs: Subscription[] = [];
  private readonly numberOfMaxRunningCounters = 4;

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {sub.unsubscribe();});
  }

  protected startCounter() {
    this.counters.push(signal({ counter: signal(0), isRunning: signal(true) }));
    this.updateDisableButtonState();

    const index = this.counters.length - 1;
    const sub = interval(500).subscribe(value => {
      const current = this.counters[index]();
      current.counter.set(value);
      if (value > 10) {
        current.counter.set(0);
        current.isRunning.set(false);
        sub.unsubscribe();
        const numberOfRunningCounters = this.counters.filter(counter =>
          counter().isRunning(),
        ).length;
        this.disableButton.set(numberOfRunningCounters > 4);
      }
    });

    this.subs.push(sub);
  }

  private updateDisableButtonState() {
    const numberOfRunningCounters = this.counters.filter(counter => counter().isRunning()).length;
    this.disableButton.set(numberOfRunningCounters > this.numberOfMaxRunningCounters);
  }
}
