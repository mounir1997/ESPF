import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IProjet {
  id?: number;
  nom?: string;
  devise?: string;
  periodicite?: string;
  utilisateur?: IUtilisateur;
}

export class Projet implements IProjet {
  constructor(
    public id?: number,
    public nom?: string,
    public devise?: string,
    public periodicite?: string,
    public utilisateur?: IUtilisateur
  ) {}
}
