import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILigneESPF, LigneESPF } from 'app/shared/model/ligne-espf.model';
import { LigneESPFService } from './ligne-espf.service';

@Component({
  selector: 'jhi-ligne-espf-update',
  templateUrl: './ligne-espf-update.component.html'
})
export class LigneESPFUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]]
  });

  constructor(protected ligneESPFService: LigneESPFService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ligneESPF }) => {
      this.updateForm(ligneESPF);
    });
  }

  updateForm(ligneESPF: ILigneESPF): void {
    this.editForm.patchValue({
      id: ligneESPF.id,
      code: ligneESPF.code
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ligneESPF = this.createFromForm();
    if (ligneESPF.id !== undefined) {
      this.subscribeToSaveResponse(this.ligneESPFService.update(ligneESPF));
    } else {
      this.subscribeToSaveResponse(this.ligneESPFService.create(ligneESPF));
    }
  }

  private createFromForm(): ILigneESPF {
    return {
      ...new LigneESPF(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILigneESPF>>): void {
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
