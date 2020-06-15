import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IValeurChamp } from 'app/shared/model/valeur-champ.model';
import { ValeurChampService } from './valeur-champ.service';
import { ValeurChampDeleteDialogComponent } from './valeur-champ-delete-dialog.component';

@Component({
  selector: 'jhi-valeur-champ',
  templateUrl: './valeur-champ.component.html'
})
export class ValeurChampComponent implements OnInit, OnDestroy {
  valeurChamps?: IValeurChamp[];
  eventSubscriber?: Subscription;

  constructor(
    protected valeurChampService: ValeurChampService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.valeurChampService.query().subscribe((res: HttpResponse<IValeurChamp[]>) => (this.valeurChamps = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInValeurChamps();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IValeurChamp): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInValeurChamps(): void {
    this.eventSubscriber = this.eventManager.subscribe('valeurChampListModification', () => this.loadAll());
  }

  delete(valeurChamp: IValeurChamp): void {
    const modalRef = this.modalService.open(ValeurChampDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.valeurChamp = valeurChamp;
  }
}
