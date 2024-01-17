import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { UpperCasePipe } from '@angular/common';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
  imports: [
    UpperCasePipe,
    CommonModule,
    FormsModule,
    HeroDetailComponent,
    RouterLink,
  ],
})
export class HeroesComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
  
  add(name:string):void{
    name = name.trim();
    if(!name){
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h=> h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  
}

