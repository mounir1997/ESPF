import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPivotSociete } from 'app/shared/model/pivot-societe.model';

@Component({
  selector: 'jhi-pivot-societe-detail',
  templateUrl: './pivot-societe-detail.component.html'
})
export class PivotSocieteDetailComponent implements OnInit {
  pivotSociete: IPivotSociete | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pivotSociete }) => (this.pivotSociete = pivotSociete));
  }

  previousState(): void {
    window.history.back();
  }
}
