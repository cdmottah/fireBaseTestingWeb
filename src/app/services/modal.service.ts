import { Inject, Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, first, Subject } from 'rxjs';
import { ModalComponent } from '../shared/modal/modal.component';
import { DOCUMENT } from '@angular/common';
import { responseModal } from '@models/responseModal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _modalState$ = new BehaviorSubject<boolean>(false);
  readonly modalState$ = this._modalState$.asObservable();

  private _modalContent = new BehaviorSubject<{ header?: TemplateRef<any>, body?: TemplateRef<any>, footer?: TemplateRef<any> } | null>(null);
  modalContent$ = this._modalContent.asObservable();




  constructor( ) { }

  open = (
    header: TemplateRef<any>,
    body: TemplateRef<any>,
    footer: TemplateRef<any>,
  ) => {

    this._modalContent.next({ header, body, footer });
    this._modalState$.next(true);
  }

  closeModal = () => {
    this._modalContent.next(null)
    this._modalState$.next(false);
  }

  toggleModal = () => {
    this._modalState$.next(!this._modalState$.getValue());
  }
}
