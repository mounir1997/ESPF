import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPivotModel } from 'app/shared/model/pivot-model.model';
import { PivotModelService } from './pivot-model.service';
import { PivotModelDeleteDialogComponent } from './pivot-model-delete-dialog.component';

@Component({
  selector: 'jhi-pivot-model',
  templateUrl: './pivot-model.component.html'
})
export class PivotModelComponent implements OnInit, OnDestroy {
  pivotModels?: IPivotModel[];
  eventSubscriber?: Subscription;

  constructor(protected pivotModelService: PivotModelService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.pivotModelService.query().subscribe((res: HttpResponse<IPivotModel[]>) => (this.pivotModels = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPivotModels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPivotModel): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPivotModels(): void {
    this.eventSubscriber = this.eventManager.subscribe('pivotModelListModification', () => this.loadAll());
  }

  delete(pivotModel: IPivotModel): void {
    const modalRef = this.modalService.open(PivotModelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pivotModel = pivotModel;
  }
}
