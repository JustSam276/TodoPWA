
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-new-task-from',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-task-from.component.html',
})
export class NewTaskFromComponent implements OnInit {
  //create form group
  taskForm!: FormGroup;

  severities = [
    { value: 1, label: "low"},
    { value: 2, label: "medium"},
    { value: 3, label: "high"}
  ];

  constructor(private tb: FormBuilder){}

  ngOnInit(){

    //making use of FormBuilder
    this.taskForm = this.tb.group({
      taskName: [
        '',
        Validators.required,
        Validators.minLength(1)
      ],
      taskMessage: [
        '',
        Validators.required,
        Validators.maxLength(100)
      ],
      severity: ['', Validators.required]
    });

    //Listen for changes
    this.taskForm.valueChanges.subscribe(value => {
      console.log("Form value changed: ", value);
    })
  }

  onSubmit(){
    if(this.taskForm?.valid){
      console.log("this.taskForm.value");
      //process of form data to be added
    }
    else{
      this.markFormGroupTouched(this.taskForm!);
    }
  }

  markFormGroupTouched(formGroup: FormGroup){
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if(control instanceof FormGroup){
        this.markFormGroupTouched(control);
      }
    })
  }

}
