import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPivotModel, PivotModel } from 'app/shared/model/pivot-model.model';
import { PivotModelService } from './pivot-model.service';

@Component({
  selector: 'jhi-pivot-model-update',
  templateUrl: './pivot-model-update.component.html'
})
export class PivotModelUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]]
  });

  constructor(protected pivotModelService: PivotModelService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pivotModel }) => {
      this.updateForm(pivotModel);
    });
  }

  updateForm(pivotModel: IPivotModel): void {
    this.editForm.patchValue({
      id: pivotModel.id,
      nom: pivotModel.nom
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pivotModel = this.createFromForm();
    if (pivotModel.id !== undefined) {
      this.subscribeToSaveResponse(this.pivotModelService.update(pivotModel));
    } else {
      this.subscribeToSaveResponse(this.pivotModelService.create(pivotModel));
    }
  }

  private createFromForm(): IPivotModel {
    return {
      ...new PivotModel(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPivotModel>>): void {
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
