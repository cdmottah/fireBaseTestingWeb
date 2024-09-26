import { Component, Input, TemplateRef } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { StateType, taskFromDatabase, taskFromFront } from "@models/task.model";
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { DatabaseService } from '@services/database.service';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'tasks-column-task',
  templateUrl: './column-task.component.html'
})
export class ColumnTaskComponent {
  @Input({ required: true }) title: string = ''
  @Input({ required: true }) tasks: taskFromFront[] = []
  taskForm

  readonly faPlus = faPlus

  constructor(
    private _formBuilder: FormBuilder,
    private _databaseService: DatabaseService,
    private _authService: AuthService,
    private _modalService: ModalService,
    private _alertService: AlertService
  ) {

    this.taskForm = this._formBuilder.group({
      title: this._formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
      description: this._formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
      state: this._formBuilder.control<StateType>('backlog', { validators: [Validators.required], nonNullable: true })
    });
  }

  onSubmit() {

    const user = this._authService.user
    if (!user) {
      this._alertService.addNewAlert('Debes estar autenticado para crear una tarea', 'danger');
      return false;
    }
    if (!this.taskForm.valid) {
      this.taskForm.markAllAsTouched();
      return false;
    }
    const task: taskFromDatabase = {
      createdDate: Timestamp.now(),
      userId: user.uid,
      description: this.taskForm.controls.description.value,
      state: this.taskForm.controls.state.value,
      title: this.taskForm.controls.title.value,
    }
    this._databaseService.createTask(task)
    return true;
  }

  openModalCreateTask(header: TemplateRef<any>, body: TemplateRef<any>, footer: TemplateRef<any>) {

    this._modalService.open(header, body, footer)
  }

  ModalCreateTaskCancel() {
    this._modalService.closeModal();
    console.log('cancelando la creación')

  }

  ModalCreateTaskCreate() {
    const allowed = this.onSubmit();
    if(!allowed) return;
    this._modalService.closeModal();
    console.log('creando la tarea')
  }
}
