import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string | null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserName().subscribe(value => this.username = value);
  }

  logout() {
    this.authService.deleteTokens();
    this.router.navigate(['/login']);
  }
}
