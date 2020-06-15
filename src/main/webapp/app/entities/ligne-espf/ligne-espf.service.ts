import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILigneESPF } from 'app/shared/model/ligne-espf.model';

type EntityResponseType = HttpResponse<ILigneESPF>;
type EntityArrayResponseType = HttpResponse<ILigneESPF[]>;

@Injectable({ providedIn: 'root' })
export class LigneESPFService {
  public resourceUrl = SERVER_API_URL + 'api/ligne-espfs';

  constructor(protected http: HttpClient) {}

  create(ligneESPF: ILigneESPF): Observable<EntityResponseType> {
    return this.http.post<ILigneESPF>(this.resourceUrl, ligneESPF, { observe: 'response' });
  }

  update(ligneESPF: ILigneESPF): Observable<EntityResponseType> {
    return this.http.put<ILigneESPF>(this.resourceUrl, ligneESPF, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILigneESPF>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILigneESPF[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
