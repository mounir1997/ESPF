import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IESPF, ESPF } from 'app/shared/model/espf.model';
import { ESPFService } from './espf.service';

@Component({
  selector: 'jhi-espf-update',
  templateUrl: './espf-update.component.html'
})
export class ESPFUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    date: [null, [Validators.required]]
  });

  constructor(protected eSPFService: ESPFService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eSPF }) => {
      if (!eSPF.id) {
        const today = moment().startOf('day');
        eSPF.date = today;
      }

      this.updateForm(eSPF);
    });
  }

  updateForm(eSPF: IESPF): void {
    this.editForm.patchValue({
      id: eSPF.id,
      code: eSPF.code,
      date: eSPF.date ? eSPF.date.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const eSPF = this.createFromForm();
    if (eSPF.id !== undefined) {
      this.subscribeToSaveResponse(this.eSPFService.update(eSPF));
    } else {
      this.subscribeToSaveResponse(this.eSPFService.create(eSPF));
    }
  }

  private createFromForm(): IESPF {
    return {
      ...new ESPF(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IESPF>>): void {
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
