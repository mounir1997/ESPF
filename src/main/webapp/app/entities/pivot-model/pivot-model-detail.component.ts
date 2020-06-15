import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPivotModel } from 'app/shared/model/pivot-model.model';

@Component({
  selector: 'jhi-pivot-model-detail',
  templateUrl: './pivot-model-detail.component.html'
})
export class PivotModelDetailComponent implements OnInit {
  pivotModel: IPivotModel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pivotModel }) => (this.pivotModel = pivotModel));
  }

  previousState(): void {
    window.history.back();
  }
}
