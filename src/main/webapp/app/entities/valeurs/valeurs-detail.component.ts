import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IValeurs } from 'app/shared/model/valeurs.model';

@Component({
  selector: 'jhi-valeurs-detail',
  templateUrl: './valeurs-detail.component.html'
})
export class ValeursDetailComponent implements OnInit {
  valeurs: IValeurs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ valeurs }) => (this.valeurs = valeurs));
  }

  previousState(): void {
    window.history.back();
  }
}
