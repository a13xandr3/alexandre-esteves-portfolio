export interface Experience {
  readonly company: string;
  readonly companyLogo: string;
  readonly client: string;
  readonly clientLogo: string;
  readonly role: string;
  readonly period: string;
  readonly context: string;
  readonly technology: string;
  readonly achievement: string;
  readonly highlights: readonly string[];
}
export interface SkillGroup {
  readonly label: string;
  readonly items: readonly string[];
}
