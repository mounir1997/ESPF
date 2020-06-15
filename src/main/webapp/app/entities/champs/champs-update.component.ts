import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IChamps, Champs } from 'app/shared/model/champs.model';
import { ChampsService } from './champs.service';

@Component({
  selector: 'jhi-champs-update',
  templateUrl: './champs-update.component.html'
})
export class ChampsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    position: [null, [Validators.required]],
    longueur: [null, [Validators.required]],
    type: [null, [Validators.required]]
  });

  constructor(protected champsService: ChampsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ champs }) => {
      this.updateForm(champs);
    });
  }

  updateForm(champs: IChamps): void {
    this.editForm.patchValue({
      id: champs.id,
      code: champs.code,
      position: champs.position,
      longueur: champs.longueur,
      type: champs.type
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const champs = this.createFromForm();
    if (champs.id !== undefined) {
      this.subscribeToSaveResponse(this.champsService.update(champs));
    } else {
      this.subscribeToSaveResponse(this.champsService.create(champs));
    }
  }

  private createFromForm(): IChamps {
    return {
      ...new Champs(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      position: this.editForm.get(['position'])!.value,
      longueur: this.editForm.get(['longueur'])!.value,
      type: this.editForm.get(['type'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChamps>>): void {
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
