export interface IChamps {
  id?: number;
  code?: string;
  position?: string;
  longueur?: string;
  type?: string;
}

export class Champs implements IChamps {
  constructor(public id?: number, public code?: string, public position?: string, public longueur?: string, public type?: string) {}
}
