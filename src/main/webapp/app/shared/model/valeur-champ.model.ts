export interface IValeurChamp {
  id?: number;
  valeur?: string;
}

export class ValeurChamp implements IValeurChamp {
  constructor(public id?: number, public valeur?: string) {}
}
