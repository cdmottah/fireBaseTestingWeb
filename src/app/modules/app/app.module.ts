import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from "./dashboard/sidebar/sidebar.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { ColumnTaskComponent } from './tasks/column-task/column-task.component';




@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    TasksListComponent,
    ColumnTaskComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
]
})
export class AppModule { }
