import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-observable-counter',
  imports: [MatButton],
  templateUrl: './observable-counter.html',
  styleUrl: './observable-counter.scss',
})
export class ObservableCounter {
  protected readonly counter = signal(0);
  protected readonly isRunning = signal(false);
  private sub?: Subscription;

  startCounter() {
    if (this.isRunning()) return;

    this.isRunning.set(true);
    this.sub = interval(500).subscribe(val => {
      this.counter.set(val);
      if (val > 10) {
        this.isRunning.set(false);
        this.sub?.unsubscribe();
        this.counter.set(0);
      }
    });
  }
}
