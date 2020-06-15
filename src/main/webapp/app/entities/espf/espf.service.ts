import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IESPF } from 'app/shared/model/espf.model';

type EntityResponseType = HttpResponse<IESPF>;
type EntityArrayResponseType = HttpResponse<IESPF[]>;

@Injectable({ providedIn: 'root' })
export class ESPFService {
  public resourceUrl = SERVER_API_URL + 'api/espfs';

  constructor(protected http: HttpClient) {}

  create(eSPF: IESPF): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eSPF);
    return this.http
      .post<IESPF>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(eSPF: IESPF): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eSPF);
    return this.http
      .put<IESPF>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IESPF>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IESPF[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(eSPF: IESPF): IESPF {
    const copy: IESPF = Object.assign({}, eSPF, {
      date: eSPF.date && eSPF.date.isValid() ? eSPF.date.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((eSPF: IESPF) => {
        eSPF.date = eSPF.date ? moment(eSPF.date) : undefined;
      });
    }
    return res;
  }
}
