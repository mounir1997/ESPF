import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPivotSociete } from 'app/shared/model/pivot-societe.model';
import { PivotSocieteService } from './pivot-societe.service';

@Component({
  templateUrl: './pivot-societe-delete-dialog.component.html'
})
export class PivotSocieteDeleteDialogComponent {
  pivotSociete?: IPivotSociete;

  constructor(
    protected pivotSocieteService: PivotSocieteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pivotSocieteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pivotSocieteListModification');
      this.activeModal.close();
    });
  }
}
