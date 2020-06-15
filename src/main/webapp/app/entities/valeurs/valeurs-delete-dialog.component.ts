import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IValeurs } from 'app/shared/model/valeurs.model';
import { ValeursService } from './valeurs.service';

@Component({
  templateUrl: './valeurs-delete-dialog.component.html'
})
export class ValeursDeleteDialogComponent {
  valeurs?: IValeurs;

  constructor(protected valeursService: ValeursService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.valeursService.delete(id).subscribe(() => {
      this.eventManager.broadcast('valeursListModification');
      this.activeModal.close();
    });
  }
}
