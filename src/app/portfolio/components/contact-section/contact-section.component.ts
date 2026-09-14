import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'section[appContactSection]',
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  protected readonly messageLength = signal(0);
  protected readonly sendState = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  protected updateMessageLength(event: Event): void {
    this.messageLength.set((event.target as HTMLTextAreaElement).value.length);
  }

  protected async sendMessage(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    if (!form.reportValidity() || this.sendState() === 'sending') return;

    this.sendState.set('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/a13xandr3ea@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error('Falha ao enviar formulário');

      form.reset();
      this.messageLength.set(0);
      this.sendState.set('success');
    } catch {
      this.sendState.set('error');
    }
  }
}
