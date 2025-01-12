import { genClass } from "./genTaskID";

export type User = {
  userID: string;
  name: string,
  surname: string,
  email: string,
  password: string,
};

const users: User[] = [
  {
    userID: "U001",
    name: "John",
    surname: "Doe",
    email: "John.Doe@gmail.com",
    password: "password123",
  },
  {
    userID: "U002",
    name: "Jane",
    surname: "Smith",
    email: "Jane.Smith@gmail.com",
    password: "password456",
  },
  {
    userID: "U003",
    name: "Alice",
    surname: "Johnson",
    email: "alice.johonson@gmail.com",
    password: "password789",
  }
];


export class UserClass {

  static genID = new genClass;

  static getAllUsers(){
    return users;
  }

  static UserByID(userID: string){
    return users.find((user) => user.userID === userID);
  };

  static createUser(name: string, surname: string, email: string, password: string): User{
    const newUser = this.genID.generateUseID();

    return {
      userID: newUser,
      name: name,
      surname: surname,
      email: email,
      password: password
    }

  }
}
