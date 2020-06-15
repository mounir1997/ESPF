import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IValeurChamp } from 'app/shared/model/valeur-champ.model';
import { ValeurChampService } from './valeur-champ.service';

@Component({
  templateUrl: './valeur-champ-delete-dialog.component.html'
})
export class ValeurChampDeleteDialogComponent {
  valeurChamp?: IValeurChamp;

  constructor(
    protected valeurChampService: ValeurChampService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.valeurChampService.delete(id).subscribe(() => {
      this.eventManager.broadcast('valeurChampListModification');
      this.activeModal.close();
    });
  }
}
