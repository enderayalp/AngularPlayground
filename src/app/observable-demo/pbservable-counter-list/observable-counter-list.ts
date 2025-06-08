import { Component, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
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
  protected counters = signal<Signal<Counter>[]>([]);
  protected readonly disableButton = signal(false);
  private subs: Subscription[] = [];
  private readonly numberOfMaxRunningCounters = 4;

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  protected startCounter() {
    const counterSignal = signal({ counter: signal(0), isRunning: signal(true) });
    this.counters.update(counters => [...counters, counterSignal]);
    this.updateDisableButtonState();

    const sub = interval(500).subscribe(value => {
      counterSignal().counter.set(value);
      if (value > 10) {
        this.stopCounter(counterSignal);
        this.counters.update(counters => counters.filter(counter => counter !== counterSignal));
        sub.unsubscribe();
      }
    });

    this.subs.push(sub);
  }

  private stopCounter(counterSignal: Signal<Counter>) {
    counterSignal().counter.set(0);
    counterSignal().isRunning.set(false);
    this.updateDisableButtonState();
  }

  private updateDisableButtonState() {
    const numberOfRunningCounters = this.counters().filter(counter => counter().isRunning()).length;
    this.disableButton.set(numberOfRunningCounters > this.numberOfMaxRunningCounters);
  }
}
