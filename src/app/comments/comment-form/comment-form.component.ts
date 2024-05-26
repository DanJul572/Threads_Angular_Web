import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent {
  @Input() placeholder = 'Write something...';
  @Input() buttonText = 'Create';
  @Output() formSubmited = new EventEmitter<{
    text: string
  }>();

  submitForm(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const textAreaElement = form.elements.namedItem('commentText') as HTMLTextAreaElement;
    const comment = textAreaElement.value;
    form.reset();
    this.formSubmited.emit({
      text: comment
    })
  }
}
