import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IValeurs } from 'app/shared/model/valeurs.model';

type EntityResponseType = HttpResponse<IValeurs>;
type EntityArrayResponseType = HttpResponse<IValeurs[]>;

@Injectable({ providedIn: 'root' })
export class ValeursService {
  public resourceUrl = SERVER_API_URL + 'api/valeurs';

  constructor(protected http: HttpClient) {}

  create(valeurs: IValeurs): Observable<EntityResponseType> {
    return this.http.post<IValeurs>(this.resourceUrl, valeurs, { observe: 'response' });
  }

  update(valeurs: IValeurs): Observable<EntityResponseType> {
    return this.http.put<IValeurs>(this.resourceUrl, valeurs, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IValeurs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IValeurs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
