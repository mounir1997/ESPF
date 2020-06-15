import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILigneESPF } from 'app/shared/model/ligne-espf.model';

@Component({
  selector: 'jhi-ligne-espf-detail',
  templateUrl: './ligne-espf-detail.component.html'
})
export class LigneESPFDetailComponent implements OnInit {
  ligneESPF: ILigneESPF | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ligneESPF }) => (this.ligneESPF = ligneESPF));
  }

  previousState(): void {
    window.history.back();
  }
}
