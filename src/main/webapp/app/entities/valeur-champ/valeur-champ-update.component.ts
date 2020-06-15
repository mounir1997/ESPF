import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IValeurChamp, ValeurChamp } from 'app/shared/model/valeur-champ.model';
import { ValeurChampService } from './valeur-champ.service';

@Component({
  selector: 'jhi-valeur-champ-update',
  templateUrl: './valeur-champ-update.component.html'
})
export class ValeurChampUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    valeur: [null, [Validators.required]]
  });

  constructor(protected valeurChampService: ValeurChampService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ valeurChamp }) => {
      this.updateForm(valeurChamp);
    });
  }

  updateForm(valeurChamp: IValeurChamp): void {
    this.editForm.patchValue({
      id: valeurChamp.id,
      valeur: valeurChamp.valeur
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const valeurChamp = this.createFromForm();
    if (valeurChamp.id !== undefined) {
      this.subscribeToSaveResponse(this.valeurChampService.update(valeurChamp));
    } else {
      this.subscribeToSaveResponse(this.valeurChampService.create(valeurChamp));
    }
  }

  private createFromForm(): IValeurChamp {
    return {
      ...new ValeurChamp(),
      id: this.editForm.get(['id'])!.value,
      valeur: this.editForm.get(['valeur'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IValeurChamp>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
