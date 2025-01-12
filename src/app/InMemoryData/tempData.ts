import { genClass } from './genTaskID'


type Task = {
  userID?: string;
  taskID: string;
  taskName: string;
  description: string;
  severity: string;
  date: Date;
  completed: boolean;
};


type Result = {
  success: boolean;
  message: string;
}

const choresList: Task[] = [
  {
    userID: "U001",
    taskID: "CH001",
    taskName: "Deep Clean Kitchen",
    description: "Clean all appliances, countertops, and mop the floor thoroughly. Don't forget to clean inside the microwave and oven.",
    severity: "high",
    date: new Date("2025-01-10"),
    completed: false
  },
  {
    userID: "U001",
    taskID: "CH002",
    taskName: "Vacuum Living Room",
    description: "Vacuum carpets, including under furniture. Pay special attention to corners and edges.",
    severity: "medium",
    date: new Date("2025-01-06"),
    completed: false
  },
  {
    userID: "U002",
    taskID: "CH003",
    taskName: "Change Air Filters",
    description: "Replace HVAC air filters in all rooms to maintain air quality and system efficiency.",
    severity: "medium",
    date: new Date("2025-01-15"),
    completed: true
  },
  {
    userID: "U002",
    taskID: "CH004",
    taskName: "Clean Bathroom",
    description: "Scrub toilet, shower, sink, and floors. Restock toiletries and clean mirrors.",
    severity: "high",
    date: new Date("2025-01-07"),
    completed: false
  },
  {
    userID: "U001",
    taskID: "CH005",
    taskName: "Do Laundry",
    description: "Wash, dry, fold, and put away all clothes, bedding, and towels.",
    severity: "medium",
    date: new Date("2025-01-05"),
    completed: true
  },

  {
    userID: "U002",
    taskID: "CH006",
    taskName: "Clean Windows",
    description: "Clean all windows inside and out, including window tracks and sills.",
    severity: "low",
    date: new Date("2025-01-20"),
    completed: false
  },

  {
    userID: "U001",
    taskID: "CH007",
    taskName: "Organize Garage",
    description: "Sort through tools, equipment, and storage. Sweep floor and organize items into designated areas.",
    severity: "high",
    date: new Date("2025-01-25"),
    completed: false
  },

  {
    userID: "U002",
    taskID: "CH008",
    taskName: "Water Plants",
    description: "Check soil moisture and water all indoor and outdoor plants as needed.",
    severity: "low",
    date: new Date("2025-01-06"),
    completed: true
  },

  {
    userID: "U001",
    taskID: "CH009",
    taskName: "Clean Gutters",
    description: "Remove leaves and debris from gutters to prevent water damage and blockages.",
    severity: "high",
    date: new Date("2025-01-30"),
    completed: false
  },

  {
    userID: "U002",
    taskID: "CH010",
    taskName: "Dust Furniture",
    description: "Dust all surfaces including shelves, tables, electronics, and picture frames.",
    severity: "medium",
    date: new Date("2025-01-08"),
    completed: true
  }
];

const severities = ['low', 'medium', 'high'];

export default choresList;
export {severities, type Task, type Result};

export class DataOperations {

  static generatValue = new genClass();

  //get all the items in choreslist
  static getAllTask(): Task[]{
    return choresList;
  }

  // get all tasks with the userID
  static getTaskByUserID(userID: string): Task[]{
    if(!userID) throw new Error("UserID is required");
    return choresList.filter((task) => task.userID?.toLowerCase() === userID.toLowerCase());
  }

  //get all tasks with the taskID
  static getTaskByTaskID(taskID: string, userID: string): Task | undefined{
    let taskList = this.getTaskByUserID(userID);
    return taskList.find((task) => task.taskID.toLowerCase() === taskID.toLowerCase());
  }

  //get all task with a specific date/time | filter
  static getTasksByDate(taskDate: Date, userID: string): Task[]{
    let taskList = this.getTaskByUserID(userID);
    return taskList.filter(
      (task) => task.date.toDateString == taskDate.toDateString
    )
  }


  static createTask(userID: string, taskName: string, description: string, severity: string, date: Date): Task{
    let generatedTaskID = this.generatValue.generateTaskID();

    return {
      userID: userID,
      taskID: generatedTaskID,
      taskName: taskName,
      description: description,
      severity: severity,
      date: date,
      completed: false
    }
  }

  //add task to main list data | add button
  static addTask(task: Task): Result {
    //validate values

    //check task ID
    let checkTaskID = choresList.filter((storage) => storage.taskID.toLowerCase() === task.taskID.toLowerCase());
    if (!checkTaskID){
      return {
        success: false,
        message: `Task with ID: ${task.taskID} already exists`
      }
    }

    //check for length and types
    //real time validations

    //valid fields
    if(!task.taskID || !task.taskName || !task.date || !task.severity){
      return {
        success: false,
        message: "Not all fields have been filled to add task"
      }
    }

    //validate severity
    if(!severities.includes(task.severity.toLowerCase())){
      return {
        success: false,
        message: `Invalid severity: ${task.severity}`
      }
    }

    //add to list
    choresList.push(task);
    return {
      success: true,
      message: `Task with ID: ${task.taskID} has been add.`
    }
  }

  //remove task from main data with specified userID and userName
  static deleteTask(taskID: string, userID: string): Result{
    let message: string;
    const newLength: number = choresList.length - 1;

    const index = choresList.findIndex(
      (task) => task.taskID.toLowerCase() === taskID.toLowerCase()
      && task.userID?.toLowerCase() === userID.toLowerCase()
    );

    if (index === -1){
      console.log("Task not found");
      return {
        success: false,
        message: `Task not found`
      }
    }

    choresList.splice(index, 1);
    return {
      success: true,
      message: `message successfully deleted`
    }
  }

  //get a specific task based on name and userID | search
  static findTaskByName(taskName: string, userID: string){
    let taskList = this.getTaskByUserID(userID);
    return taskList.filter((tasks) => tasks.taskName.toLowerCase() === taskName.toLowerCase());
  }

  //update a specifc user's task
  static updateTask(userID: string, taskID: string, newChanges: Partial<Task>): Result{
    const task = choresList.find(
      (task) =>
        task.taskID.toLowerCase() === taskID.toLowerCase()
      && task.userID?.toLowerCase() === userID.toLowerCase()
    )

    if (!task) {
      return {
        success: false,
        message: `Task with ID: ${taskID} not found`
      }
    }

    Object.assign(task, newChanges);
    return {
      success: true,
      message: `Task with ID: ${taskID} has successfully updated`
    }
  }

  static getTasksBySeverity(status: string, userID: string){
    let taskList = this.getTaskByUserID(userID);
    return taskList.filter((task) => task.severity.toLowerCase() === status.toLowerCase())
  }

}
