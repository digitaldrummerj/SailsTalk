import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../shared/services/todo.service';
import { Todo } from '../shared/classes/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {
  todoList: Array<Todo> = [];
  addForm: FormGroup;
  todo: Todo = new Todo();
  submitting: boolean = false;
  errorMessage: string;
  public isCollapsed: boolean = false;
  openItemCount: number = 0;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {
    this.addForm = formBuilder.group({
      'item': ['', [Validators.required]]
    });
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getTodoListAll();
  }

  calculateOpenItems(): void {
    this.openItemCount = this.todoList.filter(item => item.completed === false).length;
  }

  fieldSorter(fields, ignoreCase) {
    return (a, b) => fields.map(o => {
      let dir = 1;
      if (o[0] === '-') { dir = -1; o = o.substring(1); }
      if (ignoreCase === true && typeof a[o] === 'string' && typeof b[o] === 'string') {
        a[0] = a[o].toLocaleLowerCase();
        b[o] = b[o].toLocaleLowerCase();
      }

      return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p, n) => p ? p : n, 0);
  }

  sortItems(): void {
    this.todoList.sort(this.fieldSorter(['completed', 'name'], true));
  }


  getTodoListAll(): void {
    this.todoService.getList()
      .subscribe(
      data => {
        this.todoList = data;
        this.sortItems();
        this.calculateOpenItems();
      },
      error => {
        this.errorMessage = <any>error;
      }
      );
  }

  createTodo(): void {
    this.submitting = true;
    this.errorMessage = "";

    this.todoService.addTodo(this.todo)
      .subscribe(
      data => {
        this.submitting = false;
        this.todoList.push(data);
        this.openItemCount++;
        this.sortItems();
        this.addForm.reset();
      },
      error => {
        this.submitting = false;
        this.errorMessage = <any>error;
        console.log('create error', this.errorMessage);
      }
      );
  }

  completeTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo)
      .subscribe(
      data => {
        this.calculateOpenItems();
        this.sortItems();
      },
      error => {
        todo.completed = !todo.completed;
        this.errorMessage = <any>error;
        console.log('complete error', this.errorMessage);
      }
      );
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo)
      .subscribe(
      data => {
        let item = this.todoList.indexOf(todo);
        this.todoList.splice(item, 1);
        this.calculateOpenItems();
        this.sortItems();
      },
      error => {
        this.errorMessage = <any>error;
        console.log('delete error', this.errorMessage);
      }
      );
  }
}
