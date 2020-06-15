import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IValeurs } from 'app/shared/model/valeurs.model';
import { ValeursService } from './valeurs.service';
import { ValeursDeleteDialogComponent } from './valeurs-delete-dialog.component';

@Component({
  selector: 'jhi-valeurs',
  templateUrl: './valeurs.component.html'
})
export class ValeursComponent implements OnInit, OnDestroy {
  valeurs?: IValeurs[];
  eventSubscriber?: Subscription;

  constructor(protected valeursService: ValeursService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.valeursService.query().subscribe((res: HttpResponse<IValeurs[]>) => (this.valeurs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInValeurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IValeurs): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInValeurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('valeursListModification', () => this.loadAll());
  }

  delete(valeurs: IValeurs): void {
    const modalRef = this.modalService.open(ValeursDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.valeurs = valeurs;
  }
}
