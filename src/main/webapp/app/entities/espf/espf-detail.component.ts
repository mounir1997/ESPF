import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IESPF } from 'app/shared/model/espf.model';

@Component({
  selector: 'jhi-espf-detail',
  templateUrl: './espf-detail.component.html'
})
export class ESPFDetailComponent implements OnInit {
  eSPF: IESPF | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eSPF }) => (this.eSPF = eSPF));
  }

  previousState(): void {
    window.history.back();
  }
}
