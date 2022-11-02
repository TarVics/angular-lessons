import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ICar} from "../../interfaces";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Output()
  submit = new EventEmitter<ICar>();

  form: FormGroup;
  updateCar: ICar | null;

  constructor() {
    this._initForm();
  }

  ngOnInit(): void { }

  _initForm() {
    this.form = new FormGroup({
      model: new FormControl('BMW', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{1,6}$/)
      ]),
      price: new FormControl(null, [
        Validators.min(0),
        Validators.max(1000000),
        Validators.required
      ]),
      year: new FormControl(null, [
        Validators.min(1990),
        Validators.max(new Date().getFullYear()),
        Validators.required
      ])
    })
  }

  editCar(car: ICar): void {
    this.updateCar = car;
    this.form.setValue({
      model: car.model,
      price: car.price,
      year: car.year
    })
  }

  saveCar(): void {
    const car = {...this.form.value}
    if (this.updateCar) {
      car.id = this.updateCar.id;
      this.updateCar = null;
    }
    this.submit.emit(car);
    this.form.reset();
  }

}
