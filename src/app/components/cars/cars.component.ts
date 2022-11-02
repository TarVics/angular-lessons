import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {ICar} from "../../interfaces";
import {CarService} from "../../services";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: ICar[];

  @Output()
  edit = new EventEmitter<ICar>();

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getAll().subscribe(value => this.cars = value);
  }

  deleteCar(id: number) {
    this.carService.deleteById(id).subscribe(() => {
      const carIndex = this.cars.findIndex(car => car.id === id);
      this.cars.splice(carIndex, 1);
    })
  }

  editCar(car: ICar) {
    this.edit.emit(car);
  }

  saveCar(car: ICar) {
    if (!car.id) {
      this.carService.create(car).subscribe(value => {
        this.cars.push(value);
      })
    } else {
      console.log('%%% UPDATE BY ID', car)
      this.carService.updateById(car.id, car).subscribe(value => {
        const editCar = this.cars.find(item => item.id === car.id);
        Object.assign(editCar!, value);
      });
    }
  }
}
