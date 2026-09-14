import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioMainComponent } from './components/portfolio-main/portfolio-main.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { Experience, SkillGroup } from './models/portfolio.models';

@Component({
  selector: 'app-portfolio',
  imports: [PortfolioMainComponent, SiteFooterComponent, SiteHeaderComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  protected readonly year = new Date().getFullYear();
  protected readonly skillGroups: readonly SkillGroup[] = [
    {
      label: 'Front-end',
      items: ['Angular 8–20', 'TypeScript', 'RxJS', 'HTML5', 'SCSS', 'Angular CDK', 'Ionic', 'SPA'],
    },
    {
      label: 'Arquitetura',
      items: [
        'Microfrontends',
        'Angular Elements',
        'Web Components',
        'Design Systems',
        'Arquitetura Hexagonal',
      ],
    },
    {
      label: 'Qualidade',
      items: ['Jest', 'Jasmine', 'Karma', 'TDD', 'BDD', 'SOLID', 'Clean Code'],
    },
    {
      label: 'Integração e dados',
      items: ['APIs REST', 'Java', 'Node.js', 'C#', 'Oracle 19C', 'SQL Server', 'MySQL', 'MongoDB'],
    },
  ];
  protected readonly experiences: readonly Experience[] = [
    {
      company: 'KEEGGO Technology Brasil',
      companyLogo: 'assets/logos/keeggo.svg',
      client: 'Santander',
      clientLogo: 'assets/logos/santander-logo-negative.svg',
      role: 'Desenvolvedor Front-End Angular Sênior',
      period: 'out 2025 — atual',
      context: 'Banco Santander · Comércio Exterior',
      technology: 'Angular 20 + Microfrontends',
      achievement: 'Crédito internacional evoluído',
      highlights: [
        'Evolução de produtos de crédito em Angular 18 e 20.',
        'Microfrontends com Angular Elements e Web Components.',
        'APIs REST, RxJS, testes automatizados e colaboração com Produto e QA.',
      ],
    },
    {
      company: 'FOURSYS Projetos e Sistemas',
      companyLogo: 'assets/logos/logo-foursys.svg',
      client: 'Bradesco',
      clientLogo: 'assets/logos/logo-bradesco-svg.svg',
      role: 'Desenvolvedor Full-Stack Angular / Java',
      period: 'fev 2025 — out 2025',
      context: 'Banco Bradesco · Mobile PJ',
      technology: 'Angular 15 + Java 17',
      achievement: 'Jornada mobile PJ entregue',
      highlights: [
        'Aplicativo financeiro responsivo com Angular 15 e Ionic.',
        'Microserviços Java 17 com Arquitetura Hexagonal.',
        'Testes com Jest, BDD e uso avançado de RxJS.',
      ],
    },
    {
      company: 'FCamara Consultoria',
      companyLogo: 'assets/logos/fcamara-logo.svg',
      client: 'Banco BS2',
      clientLogo: 'assets/logos/banco-bs2-logo.svg',
      role: 'Desenvolvedor Front-End Angular',
      period: 'out 2024 — fev 2025',
      context: 'Banco BS2 · App Azul',
      technology: 'Angular 10 → 16',
      achievement: 'Migração do app concluída',
      highlights: [
        'Migração do Angular 10 para o Angular 16.',
        'Documentação técnica e testes com Jasmine e Karma.',
      ],
    },
    {
      company: 'Etechss Informática',
      companyLogo: 'assets/logos/logo-ecartorio.svg',
      client: 'Cartórios SP + RJ',
      clientLogo: 'assets/logos/logo-ecartorio.svg',
      role: 'Desenvolvedor Front-End Angular',
      period: 'abr 2024 — out 2024',
      context: 'Cartórios de São Paulo e Rio de Janeiro',
      technology: 'Angular 17 + MongoDB',
      achievement: 'Serviços digitais responsivos',
      highlights: [
        'Aplicações responsivas em Angular 17.',
        'Integração com MongoDB e implementação baseada em protótipos do Figma.',
      ],
    },
    {
      company: 'Nava Technology',
      companyLogo: 'assets/logos/logo-nava.svg',
      client: 'Liberty Seguros',
      clientLogo: 'assets/logos/logo-cia-primary.svg',
      role: 'Desenvolvedor Front-End Angular',
      period: 'set 2023 — abr 2024',
      context: 'Liberty Seguros',
      technology: 'Angular 15 + Oracle',
      achievement: 'Legado modernizado',
      highlights: [
        'Migração de sistemas legados para Angular 15.',
        'Integração com APIs RESTful e Oracle 19C.',
      ],
    },
    {
      company: 'F1rst Tecnologia e Inovação',
      companyLogo: 'assets/logos/F1rst-digital-services.svg',
      client: 'Cobrança PJ',
      clientLogo: 'assets/logos/F1rst-digital-services.svg',
      role: 'Desenvolvedor Angular',
      period: 'set 2020 — ago 2023',
      context: 'Cobrança PJ',
      technology: 'VB6 → Angular 8',
      achievement: 'Operação web modernizada',
      highlights: [
        'Modernização de aplicações VB6 para Angular 8.',
        'Integração com APIs desenvolvidas em Java.',
      ],
    },
    {
      company: 'GFT Brasil Consultoria',
      companyLogo: 'assets/logos/gft-technologies-logo.svg',
      client: 'Santander',
      clientLogo: 'assets/logos/logo-santander-red.svg',
      role: 'Desenvolvedor ASP Clássico',
      period: 'set 2019 — set 2020',
      context: 'Banco Santander · Meios de pagamento',
      technology: 'ASP + Mainframe',
      achievement: 'Fluxos de recebíveis sustentados',
      highlights: [
        'Aplicações para adquirência e recebíveis.',
        'Colaboração com a equipe de alta plataforma (mainframe).',
      ],
    },
  ];
}
