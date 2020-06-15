import { Moment } from 'moment';

export interface IESPF {
  id?: number;
  code?: string;
  date?: Moment;
}

export class ESPF implements IESPF {
  constructor(public id?: number, public code?: string, public date?: Moment) {}
}
