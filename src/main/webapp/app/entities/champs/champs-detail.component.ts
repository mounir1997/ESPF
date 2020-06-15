import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChamps } from 'app/shared/model/champs.model';

@Component({
  selector: 'jhi-champs-detail',
  templateUrl: './champs-detail.component.html'
})
export class ChampsDetailComponent implements OnInit {
  champs: IChamps | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ champs }) => (this.champs = champs));
  }

  previousState(): void {
    window.history.back();
  }
}
