import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {LoginFormComponent} from "../login-form/login-form.component";

@Component({
  selector: 'app-login',
  template: ''
})
export class LoginComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.matDialog.open(LoginFormComponent, {
      disableClose: true,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      hasBackdrop: false
    });
  }

}
