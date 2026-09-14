import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'footer[appPortfolioFooter]',
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent {
  readonly year = input.required<number>();
}
