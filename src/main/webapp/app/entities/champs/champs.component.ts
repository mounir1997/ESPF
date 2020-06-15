import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChamps } from 'app/shared/model/champs.model';
import { ChampsService } from './champs.service';
import { ChampsDeleteDialogComponent } from './champs-delete-dialog.component';

@Component({
  selector: 'jhi-champs',
  templateUrl: './champs.component.html'
})
export class ChampsComponent implements OnInit, OnDestroy {
  champs?: IChamps[];
  eventSubscriber?: Subscription;

  constructor(protected champsService: ChampsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.champsService.query().subscribe((res: HttpResponse<IChamps[]>) => (this.champs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChamps();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChamps): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChamps(): void {
    this.eventSubscriber = this.eventManager.subscribe('champsListModification', () => this.loadAll());
  }

  delete(champs: IChamps): void {
    const modalRef = this.modalService.open(ChampsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.champs = champs;
  }
}
