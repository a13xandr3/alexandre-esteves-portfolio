import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'header[appPortfolioHeader]',
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent {
  protected readonly menuOpen = signal(false);
  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
