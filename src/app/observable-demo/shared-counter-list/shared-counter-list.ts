import { Component, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { interval, share, Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';

export interface CounterWrapper {
  name: string;
  counter: WritableSignal<number | null>;
  isRunning: WritableSignal<boolean>;
}

export interface CounterSubscriptionMap {
  counter: WritableSignal<CounterWrapper>;
  subscription: Subscription;
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
  private readonly counterSubscriptionMap: CounterSubscriptionMap[] = [];
  private readonly numberOfMaxRunningCounters = 4;
  private sharedCounter$ = interval(500).pipe(share());

  ngOnDestroy(): void {
    for (const entry of this.counterSubscriptionMap) {
      const subscription: Subscription = entry.subscription;
      subscription.unsubscribe();
    }
  }
  protected randomName(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 3; i++) {
      const index = Math.floor(Math.random() * chars.length);
      result += chars[index];
    }
    return result;
  }

  protected startCounter() {
    const counterSignal: WritableSignal<CounterWrapper> = signal({
      name: this.randomName(),
      counter: signal<number | null>(null),
      isRunning: signal(true),
    });
    this.counters.update(counters => [...counters, counterSignal]);
    this.updateDisableButtonState();

    const sub = this.sharedCounter$.subscribe(value => {
      counterSignal().counter.set(value);
      console.log(value);
    });

    this.counterSubscriptionMap.push({ counter: counterSignal, subscription: sub });

  }

  protected stopCounter(counterSignal: Signal<CounterWrapper>) {
    counterSignal().counter.set(0);
    counterSignal().isRunning.set(false);
    this.updateDisableButtonState();
    this.counters.update(counters => counters.filter(counter => counter !== counterSignal));
    const counterIndex= this.counterSubscriptionMap.findIndex(entry => entry.counter === counterSignal);

    if(counterIndex !== -1){
      this.counterSubscriptionMap[counterIndex].subscription.unsubscribe();
      this.counterSubscriptionMap.splice(counterIndex, 1);
    }
  }

  private updateDisableButtonState() {
    const numberOfRunningCounters = this.counters().filter(counter => counter().isRunning()).length;
    this.disableButton.set(numberOfRunningCounters >= this.numberOfMaxRunningCounters);
  }
}
