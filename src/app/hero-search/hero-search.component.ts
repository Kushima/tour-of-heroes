import { HeroSearchService } from './../hero-search.service';
import { Hero } from './../hero';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observables operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {

  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroesSearchService: HeroSearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.heroes = this.searchTerms
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap(term =>
      term ? this.heroesSearchService.search(term)
      : Observable.of<Hero[]>([]))
    .catch(error => {
      console.log(error);
      return Observable.of<Hero[]>([]);
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.identification];
    this.router.navigate(link);
  }
}
