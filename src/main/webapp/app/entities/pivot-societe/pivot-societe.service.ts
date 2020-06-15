import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPivotSociete } from 'app/shared/model/pivot-societe.model';

type EntityResponseType = HttpResponse<IPivotSociete>;
type EntityArrayResponseType = HttpResponse<IPivotSociete[]>;

@Injectable({ providedIn: 'root' })
export class PivotSocieteService {
  public resourceUrl = SERVER_API_URL + 'api/pivot-societes';

  constructor(protected http: HttpClient) {}

  create(pivotSociete: IPivotSociete): Observable<EntityResponseType> {
    return this.http.post<IPivotSociete>(this.resourceUrl, pivotSociete, { observe: 'response' });
  }

  update(pivotSociete: IPivotSociete): Observable<EntityResponseType> {
    return this.http.put<IPivotSociete>(this.resourceUrl, pivotSociete, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPivotSociete>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPivotSociete[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
