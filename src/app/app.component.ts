import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import tempData from './InMemoryData/tempData';
import { TodoContentComponent } from './components/todo-content/todo-content.component';
import { ContentViewComponent } from './components/content-view/content-view.component';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, ContentViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TodoPWA';
  todoList = tempData;

}
