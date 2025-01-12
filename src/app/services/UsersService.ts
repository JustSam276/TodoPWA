import { Injectable } from "@angular/core";
import { UserClass as UserOperations} from "../InMemoryData/Users";
import { User } from "../InMemoryData/Users";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class UserServices{

  private userSubject = new BehaviorSubject<User[]>([]);
  users$ = this.userSubject.asObservable();

  constructor(){
    this.refreshUsers();
  }

  private refreshUsers(){
    const users = UserOperations.getAllUsers();
    this.userSubject.next(users);
  }

  getAllUsers(): Observable<User[]>{
    const users = UserOperations.getAllUsers();
    this.userSubject.next(users);
    return this.users$;
  }

  getUserByUserID(userID: string): Observable<User | undefined>{
    return of(UserOperations.UserByID(userID));
  }

  //CRUD methods to be add!!!

  newUser(name: string, surname: string, email: string, password: string): Observable<User>{
    return of(UserOperations.createUser(name, surname, email, password))
  }

}

