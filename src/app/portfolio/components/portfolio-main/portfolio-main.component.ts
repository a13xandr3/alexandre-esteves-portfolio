import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Experience, SkillGroup } from '../../models/portfolio.models';
import { AboutSectionComponent } from '../about-section/about-section.component';
import { ContactSectionComponent } from '../contact-section/contact-section.component';
import { EducationSectionComponent } from '../education-section/education-section.component';
import { ExperienceSectionComponent } from '../experience-section/experience-section.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { SkillsSectionComponent } from '../skills-section/skills-section.component';

@Component({
  selector: 'main[appPortfolioMain]',
  imports: [
    AboutSectionComponent,
    ContactSectionComponent,
    EducationSectionComponent,
    ExperienceSectionComponent,
    HeroSectionComponent,
    SkillsSectionComponent,
  ],
  templateUrl: './portfolio-main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioMainComponent {
  readonly experiences = input.required<readonly Experience[]>();
  readonly skillGroups = input.required<readonly SkillGroup[]>();
}
