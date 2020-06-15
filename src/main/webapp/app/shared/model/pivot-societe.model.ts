export interface IPivotSociete {
  id?: number;
  nom?: string;
}

export class PivotSociete implements IPivotSociete {
  constructor(public id?: number, public nom?: string) {}
}
