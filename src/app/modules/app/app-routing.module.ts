import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'tasks/list',
        pathMatch: 'full',
        component: TasksListComponent
      },
      {
        path: '**',
        redirectTo: 'tasks/list'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
