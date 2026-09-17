import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'section[appHeroSection]',
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {}
