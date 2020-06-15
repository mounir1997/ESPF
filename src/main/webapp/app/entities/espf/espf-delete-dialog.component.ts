import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IESPF } from 'app/shared/model/espf.model';
import { ESPFService } from './espf.service';

@Component({
  templateUrl: './espf-delete-dialog.component.html'
})
export class ESPFDeleteDialogComponent {
  eSPF?: IESPF;

  constructor(protected eSPFService: ESPFService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.eSPFService.delete(id).subscribe(() => {
      this.eventManager.broadcast('eSPFListModification');
      this.activeModal.close();
    });
  }
}
