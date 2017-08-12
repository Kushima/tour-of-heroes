import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Hero } from './hero';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  private heroesUrl = 'http://localhost:3000/hero';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    const url = `${this.heroesUrl}/list`;
    return this.http.post(url, null)
      .toPromise()
      .then(response => response.json().docs as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    console.log(id);
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.identification === id));
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 1000);
    });
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero._id}`;
    console.log(JSON.stringify(hero));
    return this.http
      .put(url, `{"data": ${JSON.stringify(hero)} }`, {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string, id: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, `{"data": ${JSON.stringify({identification: id, name: name})} }`, { headers: this.headers })
      .toPromise()
      .then(res => res.json().doc as Hero)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;

    // const options = new RequestOptions({
    //   headers: this.headers,
    //   body : `{"hardDelete": true}`
    // });

    return this.http.delete(url)
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Um erro ocorreu', error);
    return Promise.reject(error.message || error);
  }
}
