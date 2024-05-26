import { Component, OnInit, inject, signal } from '@angular/core';
import { CommentComponent } from '../comments/comment/comment.component';
import { CommentService } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../interface/comment.interface';
import { CommentFormComponent } from '../comments/comment-form/comment-form.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService);
  comments = signal<Comment[]>([]);
  userService = inject(UserService);

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe(comments => {
      this.comments.set(comments);
    })
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService.createComment({
      text: text,
      userId: user._id
    }).subscribe(createdComment => {
      this.comments.set([
        createdComment,
        ...this.comments()
      ])
    })
  }

  commentTrack(_index: number, comment: Comment) {
    return comment._id;
  }
}
