import { Injectable } from '@angular/core';
import { User } from '@firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly user$;

  constructor(
    private _storageService: StorageService
  ) {
    this.user$ = new BehaviorSubject<User | null>(this._agentInfoFromLocalStorage);
    this.user$.subscribe(res => this._agentInfoFromLocalStorage = res);
  }

  get agentInfo() { return this._agentInfoFromLocalStorage }
  private set _agentInfoFromLocalStorage(data: User | null) { this._storageService.setItemOnStorage(data, 'user') }
  private get _agentInfoFromLocalStorage() { return this._storageService.getItemOnStorage<User | null>('user', null) }
}
