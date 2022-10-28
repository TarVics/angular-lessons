import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {IUser} from "../../interfaces";
import {UserService} from "../../services";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: IUser;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.activatedRoute.url.subscribe(value => console.log(value));
    this.activatedRoute.params.subscribe(({id}) => {
      this.user = this.router.getCurrentNavigation()?.extras.state?.['user'];
      if (!this.user) {
        userService.getById(id).subscribe(value => this.user = value);
      } else {
        console.log('***', this.user);
      }
    });
  }

  ngOnInit(): void {
  }

}
