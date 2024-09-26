import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { responseModal } from '@models/responseModal';
import { ModalService } from '@services/modal.service';
import { map } from 'rxjs/operators';
import { faClose } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  modalContent$;
  show$;
  readonly faClose = faClose;

  constructor(
    private _modalService: ModalService
  ) {
    this.show$ = this._modalService.modalState$.pipe(map(modalState => (modalState) ? '' : 'hidden'))
    this.modalContent$ = this._modalService.modalContent$;
  }

  close():void{
    this._modalService.closeModal()
  }
}
