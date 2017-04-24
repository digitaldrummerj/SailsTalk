export class Todo {
  constructor(
    item: string = '',
    completed: boolean = false,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.item = item;
    this.completed = completed;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  item: string;
  completed: boolean
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
