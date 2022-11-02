import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { ICar } from 'src/app/interfaces';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  @Input()
  car: ICar;

  @Output()
  carForUpdate = new EventEmitter<ICar>();

  @Output()
  carIdForDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate(): void {
    this.carForUpdate.emit(this.car);
  }

  onDelete(): void {
    this.carIdForDelete.emit(this.car.id);
  }
}
