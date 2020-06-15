import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILigneESPF } from 'app/shared/model/ligne-espf.model';
import { LigneESPFService } from './ligne-espf.service';
import { LigneESPFDeleteDialogComponent } from './ligne-espf-delete-dialog.component';

@Component({
  selector: 'jhi-ligne-espf',
  templateUrl: './ligne-espf.component.html'
})
export class LigneESPFComponent implements OnInit, OnDestroy {
  ligneESPFS?: ILigneESPF[];
  eventSubscriber?: Subscription;

  constructor(protected ligneESPFService: LigneESPFService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.ligneESPFService.query().subscribe((res: HttpResponse<ILigneESPF[]>) => (this.ligneESPFS = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLigneESPFS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILigneESPF): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLigneESPFS(): void {
    this.eventSubscriber = this.eventManager.subscribe('ligneESPFListModification', () => this.loadAll());
  }

  delete(ligneESPF: ILigneESPF): void {
    const modalRef = this.modalService.open(LigneESPFDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ligneESPF = ligneESPF;
  }
}
