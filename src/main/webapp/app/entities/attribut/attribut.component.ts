import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAttribut } from 'app/shared/model/attribut.model';
import { AttributService } from './attribut.service';
import { AttributDeleteDialogComponent } from './attribut-delete-dialog.component';

@Component({
  selector: 'jhi-attribut',
  templateUrl: './attribut.component.html'
})
export class AttributComponent implements OnInit, OnDestroy {
  attributs?: IAttribut[];
  eventSubscriber?: Subscription;

  constructor(protected attributService: AttributService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.attributService.query().subscribe((res: HttpResponse<IAttribut[]>) => (this.attributs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAttributs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAttribut): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAttributs(): void {
    this.eventSubscriber = this.eventManager.subscribe('attributListModification', () => this.loadAll());
  }

  delete(attribut: IAttribut): void {
    const modalRef = this.modalService.open(AttributDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.attribut = attribut;
  }
}
