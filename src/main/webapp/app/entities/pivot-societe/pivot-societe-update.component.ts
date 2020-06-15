import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPivotSociete, PivotSociete } from 'app/shared/model/pivot-societe.model';
import { PivotSocieteService } from './pivot-societe.service';

@Component({
  selector: 'jhi-pivot-societe-update',
  templateUrl: './pivot-societe-update.component.html'
})
export class PivotSocieteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]]
  });

  constructor(protected pivotSocieteService: PivotSocieteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pivotSociete }) => {
      this.updateForm(pivotSociete);
    });
  }

  updateForm(pivotSociete: IPivotSociete): void {
    this.editForm.patchValue({
      id: pivotSociete.id,
      nom: pivotSociete.nom
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pivotSociete = this.createFromForm();
    if (pivotSociete.id !== undefined) {
      this.subscribeToSaveResponse(this.pivotSocieteService.update(pivotSociete));
    } else {
      this.subscribeToSaveResponse(this.pivotSocieteService.create(pivotSociete));
    }
  }

  private createFromForm(): IPivotSociete {
    return {
      ...new PivotSociete(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPivotSociete>>): void {
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
