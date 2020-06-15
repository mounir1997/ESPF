import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPivotSociete } from 'app/shared/model/pivot-societe.model';
import { PivotSocieteService } from './pivot-societe.service';
import { PivotSocieteDeleteDialogComponent } from './pivot-societe-delete-dialog.component';

@Component({
  selector: 'jhi-pivot-societe',
  templateUrl: './pivot-societe.component.html'
})
export class PivotSocieteComponent implements OnInit, OnDestroy {
  pivotSocietes?: IPivotSociete[];
  eventSubscriber?: Subscription;

  constructor(
    protected pivotSocieteService: PivotSocieteService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.pivotSocieteService.query().subscribe((res: HttpResponse<IPivotSociete[]>) => (this.pivotSocietes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPivotSocietes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPivotSociete): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPivotSocietes(): void {
    this.eventSubscriber = this.eventManager.subscribe('pivotSocieteListModification', () => this.loadAll());
  }

  delete(pivotSociete: IPivotSociete): void {
    const modalRef = this.modalService.open(PivotSocieteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pivotSociete = pivotSociete;
  }
}
