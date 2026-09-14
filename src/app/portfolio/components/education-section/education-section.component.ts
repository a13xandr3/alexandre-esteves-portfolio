import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'section[appEducationSection]',
  templateUrl: './education-section.component.html',
  styleUrl: './education-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationSectionComponent {}
