import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-table',
  imports: [],
  templateUrl: './custom-table.html',
  styleUrl: './custom-table.scss',
})
export class CustomTable implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: string[][] = [];

  ngOnInit() {
    this.columns = ['name', 'email', 'phone', 'status'];
    this.data = [
      ['ender', 'ayalp.ender@gmail.com', '017612303105', 'müde'],
      ['barbara', 'sanfilippo.ayalp@gmail.com', '01722061569', 'genervt'],
    ];
  }
}
