import { Component, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { interval, share, Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';

export interface CounterWrapper {
  counter: WritableSignal<number | null>;
  isRunning: WritableSignal<boolean>;
}

@Component({
  selector: 'app-shared-counter-list',
  imports: [MatButton],
  templateUrl: './shared-counter-list.html',
  styleUrl: './shared-counter-list.scss',
})
export class SharedCounterList implements OnDestroy {
  protected counters = signal<Signal<CounterWrapper>[]>([]);
  protected readonly disableButton = signal(false);
  private subs: Subscription[] = [];
  private readonly numberOfMaxRunningCounters = 4;
  private sharedCounter$ = interval(500).pipe(share());

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  protected startCounter() {
    const counterSignal = signal({ counter: signal<number | null>(null), isRunning: signal(true) });
    this.counters.update(counters => [...counters, counterSignal]);
    this.updateDisableButtonState();

    const sub = this.sharedCounter$.subscribe(value => {
      counterSignal().counter.set(value);
      if (value > 10) {
        this.stopCounter(counterSignal);
        this.counters.update(counters => counters.filter(counter => counter !== counterSignal));
        sub.unsubscribe();
      }
    });

    this.subs.push(sub);
  }

  private stopCounter(counterSignal: Signal<CounterWrapper>) {
    counterSignal().counter.set(0);
    counterSignal().isRunning.set(false);
    this.updateDisableButtonState();
  }

  private updateDisableButtonState() {
    const numberOfRunningCounters = this.counters().filter(counter => counter().isRunning()).length;
    this.disableButton.set(numberOfRunningCounters >= this.numberOfMaxRunningCounters);
  }
}
