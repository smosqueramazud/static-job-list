import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  public getInfoPersons(): Observable<Person[]> {
    return this.http.get<Person[]>('../../assets/data.json');
  }
}
