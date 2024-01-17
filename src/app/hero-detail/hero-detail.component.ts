import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule, UpperCasePipe, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [UpperCasePipe, CommonModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
})
export class HeroDetailComponent {
  hero: Hero|undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    this.getHero();
  }

  getHero():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
  goBack(): void{
    this.location.back();
  }

  save():void{
    if(this.hero){
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
