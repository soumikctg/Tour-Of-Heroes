import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent {
  heroes$!:Observable<Hero[]>;

  private searchTerms = new Subject<string>(
    
  );

  constructor(private heroService: HeroService){
    this.heroes$ =this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string) => this.heroService.searchHeroes(term)),
    );
  }

  search(term: string): void{
    this.searchTerms.next(term);
  }


}
