import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class HeroSearchService {

  private heroesUrl = 'http://localhost:3000/hero';

  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`${this.heroesUrl}/?name=${term}`)
      .map(response => response.json().docs as Hero[]);
  }
}
