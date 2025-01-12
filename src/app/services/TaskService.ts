
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { TodoContentComponent } from "../components/todo-content/todo-content.component";
import { DataOperations as InMemoryService } from "../InMemoryData/tempData";
import { Task, Result, severities } from "../InMemoryData/tempData";


@Injectable({
  providedIn: 'root'
})
export class dataService {

  //State management
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.refreshTasks();
  }

  private refreshTasks(){
    const tasks = InMemoryService.getAllTask();
    this.tasksSubject.next(tasks)
  }

  //Filter Operations
  getAllTask(): Observable<Task[]> {
    //This approach is for future switch HTTP calls
    const tasks = InMemoryService.getAllTask();
    this.tasksSubject.next(tasks);
    return this.tasks$;
  }

  getTaskByUserID(userID: string): Observable<Task[]> {
    return of(InMemoryService.getTaskByUserID(userID));
  }

  getTaskByTaskID(userID: string, taskID: string): Observable<Task | undefined>{
    return of(InMemoryService.getTaskByTaskID(userID, taskID));
  }

  getTaskByDate(date: Date, userID: string): Observable<Task[]>{
    return of(InMemoryService.getTasksByDate(date, userID));
  }

  getTaskByName(taskName: string, userID: string): Observable<Task[]>{
    return of(InMemoryService.findTaskByName(taskName, userID));
  }

  getTaskBySeverity(status: string, userID: string): Observable<Task[]>{
    return of(InMemoryService.getTasksBySeverity(status, userID))
  }

  //Crud Opereations
  addTask(userID: string,taskName: string, description: string, severity: string, date: Date){
    let newTask = InMemoryService.createTask(userID, taskName, description, severity, date);
    const output = InMemoryService.addTask(newTask);
    if(output.success){
      this.refreshTasks(); //Update state after successful add
    }

    return of(output);
  }

  deleteTask(userID: string, taskID: string){
    InMemoryService.deleteTask(taskID, userID);
    this.refreshTasks();
    return of(void 0)
  }

  updateTask(userID: string, taskID: string, newChanges: Partial<Task>){
    InMemoryService.updateTask(userID, taskID, newChanges);
    this.refreshTasks();
    return of(void 0);
  }

}
