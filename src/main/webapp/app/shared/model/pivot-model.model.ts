export interface IPivotModel {
  id?: number;
  nom?: string;
}

export class PivotModel implements IPivotModel {
  constructor(public id?: number, public nom?: string) {}
}
