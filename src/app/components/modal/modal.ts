import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-modal',
  imports: [FormsModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
 @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{role:string,email:string}>();

  email: string = '';
  role: string = '';

  roles: string[] = ['developer', 'tester', 'designer', 'manager'];

  onCancel() {
    this.close.emit();
  }

  onSave() {
    if (this.email && this.role) {
      this.save.emit({email: this.email, role: this.role});
    }
  }


}
