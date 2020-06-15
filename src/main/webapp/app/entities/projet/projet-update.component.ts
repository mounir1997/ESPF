import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProjet, Projet } from 'app/shared/model/projet.model';
import { ProjetService } from './projet.service';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';

@Component({
  selector: 'jhi-projet-update',
  templateUrl: './projet-update.component.html'
})
export class ProjetUpdateComponent implements OnInit {
  isSaving = false;
  utilisateurs: IUtilisateur[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    devise: [null, [Validators.required]],
    periodicite: [null, [Validators.required]],
    utilisateur: []
  });

  constructor(
    protected projetService: ProjetService,
    protected utilisateurService: UtilisateurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projet }) => {
      this.updateForm(projet);

      this.utilisateurService.query().subscribe((res: HttpResponse<IUtilisateur[]>) => (this.utilisateurs = res.body || []));
    });
  }

  updateForm(projet: IProjet): void {
    this.editForm.patchValue({
      id: projet.id,
      nom: projet.nom,
      devise: projet.devise,
      periodicite: projet.periodicite,
      utilisateur: projet.utilisateur
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const projet = this.createFromForm();
    if (projet.id !== undefined) {
      this.subscribeToSaveResponse(this.projetService.update(projet));
    } else {
      this.subscribeToSaveResponse(this.projetService.create(projet));
    }
  }

  private createFromForm(): IProjet {
    return {
      ...new Projet(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      devise: this.editForm.get(['devise'])!.value,
      periodicite: this.editForm.get(['periodicite'])!.value,
      utilisateur: this.editForm.get(['utilisateur'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProjet>>): void {
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

  trackById(index: number, item: IUtilisateur): any {
    return item.id;
  }
}
