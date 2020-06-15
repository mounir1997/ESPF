import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPivotModel } from 'app/shared/model/pivot-model.model';
import { PivotModelService } from './pivot-model.service';

@Component({
  templateUrl: './pivot-model-delete-dialog.component.html'
})
export class PivotModelDeleteDialogComponent {
  pivotModel?: IPivotModel;

  constructor(
    protected pivotModelService: PivotModelService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pivotModelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pivotModelListModification');
      this.activeModal.close();
    });
  }
}
