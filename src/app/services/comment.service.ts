import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import environment from '../environment';
import { Comment } from '../interface/comment.interface';

type createCommentDto = {
  parentId?: string;
  text: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  http = inject(HttpClient)

  getComments(parentId?: string) {
    let url = `${environment.apibaseUrl}/comments`;
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url)
  }

  createComment(comment: createCommentDto) {
    return this.http.post<Comment>(`${environment.apibaseUrl}/comments`, comment);
  }
}
