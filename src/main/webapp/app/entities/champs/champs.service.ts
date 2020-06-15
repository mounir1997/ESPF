import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChamps } from 'app/shared/model/champs.model';

type EntityResponseType = HttpResponse<IChamps>;
type EntityArrayResponseType = HttpResponse<IChamps[]>;

@Injectable({ providedIn: 'root' })
export class ChampsService {
  public resourceUrl = SERVER_API_URL + 'api/champs';

  constructor(protected http: HttpClient) {}

  create(champs: IChamps): Observable<EntityResponseType> {
    return this.http.post<IChamps>(this.resourceUrl, champs, { observe: 'response' });
  }

  update(champs: IChamps): Observable<EntityResponseType> {
    return this.http.put<IChamps>(this.resourceUrl, champs, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChamps>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChamps[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
