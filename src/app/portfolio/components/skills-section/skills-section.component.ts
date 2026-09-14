import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { SkillGroup } from '../../models/portfolio.models';

@Component({
  selector: 'section[appSkillsSection]',
  imports: [MatChipsModule],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsSectionComponent {
  readonly skillGroups = input.required<readonly SkillGroup[]>();
}
