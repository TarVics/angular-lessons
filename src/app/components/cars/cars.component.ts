import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ICar} from "../../interfaces";
import {CarService} from "../../services";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: ICar[];
  form: FormGroup;
  updateCar: ICar | null;

  constructor(private carService: CarService) {
    this._initForm();
  }

  ngOnInit(): void {
    this.carService.getAll().subscribe(value => this.cars = value);
  }

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

  onSave(): void {
    console.log(this.form);
    if (!this.updateCar) {
      this.carService.create(this.form.value).subscribe(value => {
        this.cars.push(value);
      })
    } else {
      this.carService.updateById(this.updateCar.id, this.form.value).subscribe(value => {
        const car = this.cars.find(car => car.id === this.updateCar?.id);
        Object.assign(car!, value);
        this.updateCar = null;
      });
    }
    this.form.reset();
  }

  onEdit(car: ICar): void {
    this.updateCar = car;
    this.form.setValue({
      model: car.model,
      price: car.price,
      year: car.year
    })
  }

  onDelete(id: number): void {
    this.carService.deleteById(id).subscribe(() => {
      const carIndex = this.cars.findIndex(car => car.id === id);
      this.cars.splice(carIndex, 1);
    })
  }
}
