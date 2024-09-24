import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { task } from '@models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  firestore: Firestore = inject(Firestore);
  tasks$;

  constructor() {
    const itemCollection = collection(this.firestore, 'tareas');
    this.tasks$ = collectionData(itemCollection) as Observable<task[]>
  }


  createTask(){

  }
}
