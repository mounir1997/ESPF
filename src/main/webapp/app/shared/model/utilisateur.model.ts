export interface IUtilisateur {
  id?: number;
  login?: string;
  mdp?: string;
  role?: string;
}

export class Utilisateur implements IUtilisateur {
  constructor(public id?: number, public login?: string, public mdp?: string, public role?: string) {}
}
