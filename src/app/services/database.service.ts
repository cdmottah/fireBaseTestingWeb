import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, query, Timestamp, where } from "@angular/fire/firestore";
import { taskFromDatabase, taskFromFront } from '@models/task.model';
import { from, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  firestore: Firestore = inject(Firestore);
  _tasksCollection;
  tasks$: Observable<taskFromFront[]>

  constructor(
    private _authService:AuthService
  ) {
    this._tasksCollection = collection(this.firestore, 'tareas',);
    const user = this._authService.user
    // si quieres obtenerlas solo para este usuario, ejemplo filtro
    const onlyThisUser = query(this._tasksCollection, where('userId', '==', user?.uid));
    // si quieres obtener todas
    // const taskToConvert$ = collectionData(this._tasksCollection) as Observable<taskFromDatabase[]>
    const taskToConvert$ = collectionData(onlyThisUser) as Observable<taskFromDatabase[]>

    this.tasks$ = taskToConvert$.pipe(map(res => res.map(res => { return { ...res, createdDate: (res.createdDate as Timestamp).toDate() } })))
  }


  createTask(task: taskFromDatabase) {
    return from(addDoc(this._tasksCollection, <taskFromDatabase>task))
  }
}
