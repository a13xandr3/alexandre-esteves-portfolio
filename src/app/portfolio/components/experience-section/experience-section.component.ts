import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Experience } from '../../models/portfolio.models';

@Component({
  selector: 'section[appExperienceSection]',
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSectionComponent {
  readonly experiences = input.required<readonly Experience[]>();
}
