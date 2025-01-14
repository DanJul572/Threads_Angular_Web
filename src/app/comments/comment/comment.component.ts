import { CommonModule } from '@angular/common';
import { Component, Input, effect, inject, signal } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from '../../interface/comment.interface';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input()
  comment !: Comment;

  isExpanded = signal(false);
  isReplying = signal(false);
  nestedComments = signal<Comment[]>([]);
  commentService = inject(CommentService);
  userService = inject(UserService);

  nestedCommenstEffect = effect(() => {
    if (this.isExpanded()) {
      this.commentService.getComments(this.comment._id)
        .subscribe(comments => {
          this.nestedComments.set(comments);
        })
    }
  })

  toggleReplying() {
    this.isReplying.set(!this.isReplying())
    if (!this.isExpanded()) {
      this.isExpanded.set(true)
    }
  }

  toggleExpanded() {
    this.isExpanded.set(!this.isExpanded())
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService.createComment({
      text: text,
      userId: user._id,
      parentId: this.comment._id
    }).subscribe(createdComment => {
      this.nestedComments.set([
        createdComment,
        ...this.nestedComments()
      ])
    })
  }

  commentTrack(_index: number, comment: Comment) {
    return comment._id;
  }
}
