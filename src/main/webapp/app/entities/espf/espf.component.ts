import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IESPF } from 'app/shared/model/espf.model';
import { ESPFService } from './espf.service';
import { ESPFDeleteDialogComponent } from './espf-delete-dialog.component';

@Component({
  selector: 'jhi-espf',
  templateUrl: './espf.component.html'
})
export class ESPFComponent implements OnInit, OnDestroy {
  eSPFS?: IESPF[];
  eventSubscriber?: Subscription;

  constructor(protected eSPFService: ESPFService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.eSPFService.query().subscribe((res: HttpResponse<IESPF[]>) => (this.eSPFS = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInESPFS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IESPF): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInESPFS(): void {
    this.eventSubscriber = this.eventManager.subscribe('eSPFListModification', () => this.loadAll());
  }

  delete(eSPF: IESPF): void {
    const modalRef = this.modalService.open(ESPFDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.eSPF = eSPF;
  }
}
