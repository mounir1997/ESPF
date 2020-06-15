import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILigneESPF } from 'app/shared/model/ligne-espf.model';
import { LigneESPFService } from './ligne-espf.service';

@Component({
  templateUrl: './ligne-espf-delete-dialog.component.html'
})
export class LigneESPFDeleteDialogComponent {
  ligneESPF?: ILigneESPF;

  constructor(protected ligneESPFService: LigneESPFService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ligneESPFService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ligneESPFListModification');
      this.activeModal.close();
    });
  }
}
