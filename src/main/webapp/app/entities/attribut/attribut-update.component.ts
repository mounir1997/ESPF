import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAttribut, Attribut } from 'app/shared/model/attribut.model';
import { AttributService } from './attribut.service';

@Component({
  selector: 'jhi-attribut-update',
  templateUrl: './attribut-update.component.html'
})
export class AttributUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    valeur: [null, [Validators.required]]
  });

  constructor(protected attributService: AttributService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attribut }) => {
      this.updateForm(attribut);
    });
  }

  updateForm(attribut: IAttribut): void {
    this.editForm.patchValue({
      id: attribut.id,
      code: attribut.code,
      valeur: attribut.valeur
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const attribut = this.createFromForm();
    if (attribut.id !== undefined) {
      this.subscribeToSaveResponse(this.attributService.update(attribut));
    } else {
      this.subscribeToSaveResponse(this.attributService.create(attribut));
    }
  }

  private createFromForm(): IAttribut {
    return {
      ...new Attribut(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      valeur: this.editForm.get(['valeur'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttribut>>): void {
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
