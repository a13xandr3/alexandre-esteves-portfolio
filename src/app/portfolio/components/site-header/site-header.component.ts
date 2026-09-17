import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'header[appPortfolioHeader]',
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly sectionIds = ['inicio', 'sobre', 'experiencia', 'competencias', 'formacao'];
  private animationFrameId: number | null = null;

  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal('inicio');

  ngAfterViewInit(): void {
    const window = this.document.defaultView;

    if (!window) {
      return;
    }

    window.addEventListener('scroll', this.scheduleActiveSectionUpdate, { passive: true });
    window.addEventListener('resize', this.scheduleActiveSectionUpdate, { passive: true });
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    const window = this.document.defaultView;

    if (!window) {
      return;
    }

    window.removeEventListener('scroll', this.scheduleActiveSectionUpdate);
    window.removeEventListener('resize', this.scheduleActiveSectionUpdate);

    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected selectSection(section: string): void {
    this.activeSection.set(section);
    this.closeMenu();
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  private readonly scheduleActiveSectionUpdate = (): void => {
    const window = this.document.defaultView;

    if (!window || this.animationFrameId !== null) {
      return;
    }

    this.animationFrameId = window.requestAnimationFrame(() => {
      this.animationFrameId = null;
      this.updateActiveSection();
    });
  };

  private updateActiveSection(): void {
    const activationLine = this.elementRef.nativeElement.getBoundingClientRect().height + 1;
    let currentSection = this.sectionIds[0];

    for (const sectionId of this.sectionIds) {
      const section = this.document.getElementById(sectionId);

      if (section && section.getBoundingClientRect().top <= activationLine) {
        currentSection = sectionId;
      } else {
        break;
      }
    }

    this.activeSection.set(currentSection);
  }
}
