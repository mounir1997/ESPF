export interface IAttribut {
  id?: number;
  code?: string;
  valeur?: string;
}

export class Attribut implements IAttribut {
  constructor(public id?: number, public code?: string, public valeur?: string) {}
}
