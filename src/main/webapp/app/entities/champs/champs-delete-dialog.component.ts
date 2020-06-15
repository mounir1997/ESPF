import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChamps } from 'app/shared/model/champs.model';
import { ChampsService } from './champs.service';

@Component({
  templateUrl: './champs-delete-dialog.component.html'
})
export class ChampsDeleteDialogComponent {
  champs?: IChamps;

  constructor(protected champsService: ChampsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.champsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('champsListModification');
      this.activeModal.close();
    });
  }
}
