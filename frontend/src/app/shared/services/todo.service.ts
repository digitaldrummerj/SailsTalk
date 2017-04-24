import { Injectable } from '@angular/core';
import { Todo } from '../classes/todo';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

let todoUrl = environment.apiBaseUrl + '/todo';
let options = new RequestOptions({ withCredentials: true });

@Injectable()
export class TodoService {
  constructor(private http: Http) {
  }

  // TODO
  // implement exception handling strategy
  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  addTodo(todo: Todo): Observable<Todo> {
    let body = JSON.stringify({
      item: todo.item,
      completed: false
    });

    return this.http.post(todoUrl, body, options)
      .map((res: Response) => <Todo>res.json())
      .catch(this.handleError);
  }

  getList(): Observable<Todo[]> {
    return this.http.get(todoUrl, options)
      .map((res: Response) => <Todo>res.json())
      .catch(this.handleError);

  }

  updateTodo(todo: Todo): Observable<Todo> {
    let body = JSON.stringify({
      item: todo.item,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      id: todo.id
    });

    return this.http.put(todoUrl + '/' + todo.id, body, options)
      .map((res: Response) => <Todo>res.json())
      .catch(this.handleError);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.delete(todoUrl + '/' + todo.id, options)
      .map((res: Response) => <Todo>res.json())
      .catch(this.handleError);
  }
}
