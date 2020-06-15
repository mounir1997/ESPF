export interface IValeurs {
  id?: number;
  valeur?: string;
}

export class Valeurs implements IValeurs {
  constructor(public id?: number, public valeur?: string) {}
}
