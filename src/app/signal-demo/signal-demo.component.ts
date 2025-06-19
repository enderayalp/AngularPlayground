import {Component, computed, effect, OnInit, signal, Signal, WritableSignal} from '@angular/core';

interface Person {
  name: string;
}

@Component({
  selector: 'app-signal',
  imports: [],
  templateUrl: './signal-demo.component.html',
  styleUrl: './signal-demo.component.scss',
})
export class SignalDemo implements OnInit {
  protected value: WritableSignal<number> = signal(0);
  protected computedValue: Signal<number> = computed(()=>this.value()*2);

  protected person: WritableSignal<Person> = signal({name: 'Lien'});
  protected changedPerson: Signal<Person> = computed(()=>({...this.person(),name:this.person().name.concat(' neu')}),
    {
      equal: (a, b) => a.name === b.name
    });

  constructor(){
    effect(()=> console.log('Person changed to '+ this.changedPerson().name));
  }

  ngOnInit() {

    setTimeout(() => this.value.update(value => value + 1), 1500);
    setTimeout(() => this.person.update(person => person), 1500);
    setTimeout(() => this.person.update(person => ({ ...person, name: 'ender' })), 2000);

  }
}
