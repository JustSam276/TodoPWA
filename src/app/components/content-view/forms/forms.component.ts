import { Component } from '@angular/core';
import { NewTaskFromComponent } from './newTask-form/new-task-from.component';
import { UserFormComponent } from './user-form/user-form.component';


@Component({
  selector: 'app-forms',
  imports: [NewTaskFromComponent, UserFormComponent],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {

}
