export interface ILigneESPF {
  id?: number;
  code?: string;
}

export class LigneESPF implements ILigneESPF {
  constructor(public id?: number, public code?: string) {}
}
