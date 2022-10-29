import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {IComment} from "../../interfaces";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: IComment;

  @Output()
  onComment = new EventEmitter<IComment>();

  constructor(private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { }

  lift() {
    this.onComment.emit(this.comment)
  }

  getDetails() {
    this.router.navigate([this.comment.id], {
      relativeTo: this.activatedRoute,
      state: this.comment
    })
  }
}
