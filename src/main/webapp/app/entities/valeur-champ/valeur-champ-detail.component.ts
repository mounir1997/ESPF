import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IValeurChamp } from 'app/shared/model/valeur-champ.model';

@Component({
  selector: 'jhi-valeur-champ-detail',
  templateUrl: './valeur-champ-detail.component.html'
})
export class ValeurChampDetailComponent implements OnInit {
  valeurChamp: IValeurChamp | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ valeurChamp }) => (this.valeurChamp = valeurChamp));
  }

  previousState(): void {
    window.history.back();
  }
}
