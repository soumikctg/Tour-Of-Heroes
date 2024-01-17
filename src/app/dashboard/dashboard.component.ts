import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from "../hero-search/hero-search.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, RouterLink, HeroSearchComponent]
})
export class DashboardComponent {
  heroes: Hero[]=[];
  constructor(private heroService: HeroService){
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1,5));
  }
}
