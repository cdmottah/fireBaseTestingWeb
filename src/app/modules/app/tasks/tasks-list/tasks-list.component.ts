import { Component } from '@angular/core';
import { DatabaseService } from '@services/database.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
})
export class TasksListComponent  {

  readonly todo$
  readonly wip$
  readonly done$
  readonly backlog$


  constructor(
   private _databaseService: DatabaseService
  ) {

    this.todo$ = _databaseService.tasks$.pipe(map(tasks => tasks.filter(task => task.state == 'to-do')))
    this.wip$ = _databaseService.tasks$.pipe(map(tasks => tasks.filter(task => task.state == 'WIP')))
    this.done$ = _databaseService.tasks$.pipe(map(tasks => tasks.filter(task => task.state == 'done')))
    this.backlog$ = _databaseService.tasks$.pipe(map(tasks => tasks.filter(task => task.state == 'backlog')))
  }

  addNewTask() {

  }



}
