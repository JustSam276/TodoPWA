
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../InMemoryData/Users';
import { UserServices } from '../../../../services/UsersService';


//Using Template-Driven Form for Users
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent{

  user: User = {
    userID: '', //will be validated by the service
    name: '',
    surname: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserServices){}

  onSubmit(){



    if(this.user){
      this.userService.newUser(
        this.user!.name,
        this.user!.surname,
        this.user!.email,
        this.user!.password
      ).subscribe({
        next: (newUser) => {
          console.log(`User created successfully: ${newUser}`);
          // todo: add creation handling
        },
        error: (err) => {
          console.log(`Failed to create user: ${err}`);
          // todo: add error handling
        }
      });
    }
  }

}
