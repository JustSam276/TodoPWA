import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task-from',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-task-from.component.html',
})
export class NewTaskFromComponent {

  formData = {
    name: '',
    email: '',
    message: ''
  };

  validateName(name: string): boolean{
    return false;
  }

  validateEmail(name: EmailValidator): boolean{
    return false;
  }


  onSubmit() {
    console.log('Form submitted:', this.formData);
  }
}
