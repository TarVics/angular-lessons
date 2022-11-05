import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {RegisterFormComponent} from "../register-form/register-form.component";

@Component({
  selector: 'app-register',
  template: ''
})
export class RegisterComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.matDialog.open(RegisterFormComponent, {
      disableClose: true,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      hasBackdrop: false
    });
  }

}
