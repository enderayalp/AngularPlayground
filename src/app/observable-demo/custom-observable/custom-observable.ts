import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-custom-observable',
  imports: [MatButton],
  templateUrl: './custom-observable.html',
  styleUrl: './custom-observable.scss',
})
export class CustomObservable {
  private counter = 0;
  protected observable = new Observable<number>(subscriber => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < 10) {
        console.log('intervall läuft', i);
        subscriber.next(i++);
      } else {
        clearInterval(interval);
        subscriber.complete();
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      subscriber.complete();
    }, 5000);
  });

  protected startCounter() {
    this.observable.subscribe({
      next: number => console.log(number),
      complete: () => console.log('complete'),
    });
  }
}
