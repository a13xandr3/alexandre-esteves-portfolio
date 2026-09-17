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
  private readonly sectionIds = [
    'inicio',
    'sobre',
    'experiencia',
    'competencias',
    'formacao',
    'contato',
  ];
  private animationFrameId: number | null = null;
  private navigationTimer: ReturnType<typeof setTimeout> | null = null;
  private navigatingTo: string | null = null;

  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal('inicio');
  protected readonly activeHeaderIcon = signal<string | null>(null);

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

    if (this.navigationTimer !== null) {
      clearTimeout(this.navigationTimer);
    }
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected selectSection(section: string, event: MouseEvent): void {
    event.preventDefault();
    this.activeSection.set(section);
    this.activeHeaderIcon.set(section === 'contato' ? 'email' : null);
    this.closeMenu();

    const window = this.document.defaultView;
    const target = this.document.getElementById(section);

    if (!window || !target) {
      return;
    }

    this.navigatingTo = section;
    window.history.replaceState(null, '', `#${section}`);
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });

    if (this.navigationTimer !== null) {
      clearTimeout(this.navigationTimer);
    }

    this.navigationTimer = setTimeout(() => {
      this.navigatingTo = null;
      this.navigationTimer = null;
      this.updateActiveSection();
    }, 850);
  }

  protected selectHeaderIcon(icon: string): void {
    this.activeHeaderIcon.set(icon);
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
    if (this.navigatingTo) {
      this.activeSection.set(this.navigatingTo);
      return;
    }

    const window = this.document.defaultView;
    const headerHeight = this.elementRef.nativeElement.getBoundingClientRect().height;
    // A linha fica alguns pixels abaixo do header para absorver arredondamentos de rem,
    // scroll-padding e escala de tela sem manter a seção anterior ativa.
    const activationLine = headerHeight + Math.max(8, (window?.innerHeight ?? 0) * 0.015);
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
    this.activeHeaderIcon.set(currentSection === 'contato' ? 'email' : null);
  }
}
