import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IValeurs, Valeurs } from 'app/shared/model/valeurs.model';
import { ValeursService } from './valeurs.service';

@Component({
  selector: 'jhi-valeurs-update',
  templateUrl: './valeurs-update.component.html'
})
export class ValeursUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    valeur: [null, [Validators.required]]
  });

  constructor(protected valeursService: ValeursService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ valeurs }) => {
      this.updateForm(valeurs);
    });
  }

  updateForm(valeurs: IValeurs): void {
    this.editForm.patchValue({
      id: valeurs.id,
      valeur: valeurs.valeur
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const valeurs = this.createFromForm();
    if (valeurs.id !== undefined) {
      this.subscribeToSaveResponse(this.valeursService.update(valeurs));
    } else {
      this.subscribeToSaveResponse(this.valeursService.create(valeurs));
    }
  }

  private createFromForm(): IValeurs {
    return {
      ...new Valeurs(),
      id: this.editForm.get(['id'])!.value,
      valeur: this.editForm.get(['valeur'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IValeurs>>): void {
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
