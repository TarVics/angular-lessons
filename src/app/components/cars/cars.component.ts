import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";

import {ICar, IPaginatedData} from "../../interfaces";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, AfterViewInit {
  cars: ICar[];
  total_items: number;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(({page}) => {
      this.paginator.pageIndex = page-1;
      this.changeDetectorRef.detectChanges();
    })
    this.paginator.page.subscribe((page) => {
      console.log(page);
      this.router.navigate([], {queryParams: {page: page.pageIndex+1}})

    })
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map(value => value['data'] as IPaginatedData<ICar>)
    ).subscribe((data) => {
      this.total_items = data.total_items;
      this.cars = data.data;
    })
  }

}
