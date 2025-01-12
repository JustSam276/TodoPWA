import { Observable } from 'rxjs';
import { dataService } from './../../services/TaskService';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../InMemoryData/tempData';
import { CommonModule, NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-todo-content',
  imports: [CommonModule, NgIf],
  templateUrl: './todo-content.component.html',
  styleUrl: './todo-content.component.css'
})
export class TodoContentComponent implements OnInit{

  tasks$ !: Observable<Task[]>;

  constructor(private dataService: dataService){

  }

  ngOnInit(): void {
    this.tasks$ = this.dataService.getAllTask();
    this.tasks$.subscribe({
      error: (error) => {
        console.error("Error fetching tasks: ", error)
      }
    })
  }

  addTask(taskData: any) {
    this.dataService.addTask(
      taskData, //fix user ID, where will i pull this from
      taskData.name,
      taskData.description,
      taskData.severity,
      taskData.date
    )
    .subscribe(
      result => {
        if (result.success){
          console.log("for addTask, adding is a success")
        } else{
          console.log("Addtask is NOT a success");
        }
      }
    )
  }

}
