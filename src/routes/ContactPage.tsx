import { Fragment, useState } from 'react';
import {
  FiArrowRight,
  FiMapPin,
} from 'react-icons/fi';
import { FiFileText, FiKey, FiPhoneCall, FiUserCheck } from 'react-icons/fi';
import { useReveal } from '../components/Hooks/useReveal';
import { Positioning } from '../components/Sections/Positioning';
import { EditableText, useContent } from '../cms';
import { TEXT, type TextId } from '../content';

/** Referential V2.1 §8 « Parcours Devenir client »: four steps, in the pillar grid of the validated home. */
const STEP_ICONS = [FiPhoneCall, FiUserCheck, FiFileText, FiKey];
const Parcours = () => (
  <Positioning
    heading={<EditableText id="contact.parcours.heading" as="span">{TEXT['contact.parcours.heading']}</EditableText>}
    pillars={[1, 2, 3, 4].map((n, i) => ({
      icon: STEP_ICONS[i],
      title: <EditableText id={`contact.step${n}.n1` as TextId} as="span">{TEXT[`contact.step${n}.n1` as TextId]}</EditableText>,
      desc: <EditableText id={`contact.step${n}.n2` as TextId} as="span">{TEXT[`contact.step${n}.n2` as TextId]}</EditableText>,
    }))}
  />
);

/** §8 « Coordonnées »: one CMS text, set verbatim in the validated panel; the e-mail address and phone numbers become links. */
const LINKABLE = /([\w.-]+@[\w-]+\.[a-z]{2,}|\+\d{3}(?:\s\d{2,3}){4})/;
const useCoordonnees = () => ({ text: useContent('contact.coordonnees.n1')?.value || TEXT['contact.coordonnees.n1'] });

const TOPICS = [
  { value: 'relation', label: 'Entrer en relation' },
  { value: 'opportunites', label: 'Accéder aux opportunités en cours' },
  { value: 'mandat', label: 'Gestion sous mandat / Private Office' },
  { value: 'emetteur', label: 'Émettre / structurer une opération' },
  { value: 'institution', label: 'Partenariat institutionnel' },
  { value: 'autre', label: 'Autre demande' },
];

export const ContactPage = () => {
  const formRef = useReveal<HTMLElement>();
  const coord = useCoordonnees();

  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    topic: TOPICS[0].value,
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const topicLabel = TOPICS.find((t) => t.value === form.topic)?.label ?? 'Demande';
    const subject = encodeURIComponent(`[Contact] ${topicLabel} — ${form.name}`);
    const body = encodeURIComponent(
      `Nom : ${form.name}\n` +
        `Email : ${form.email}\n` +
        `Organisation : ${form.organization || '—'}\n` +
        `Sujet : ${topicLabel}\n\n` +
        `${form.message}`,
    );
    window.location.href = `mailto:contact@everestfin.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
      {/* ─── Hero — Mauve Banner (matches Bourse / Outils / Expertises) ─── */}
      <section className="relative pt-[200px] pb-12 md:pb-16 border-b border-black/10 bg-[var(--everest-green)]">
        <div className="relative z-10 page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-6">
              <h1 className="font-primary font-bold leading-[0.95] tracking-tight text-[var(--pure-white)]" style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' }}>
                Contact / Devenir client
              </h1>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <EditableText id="contact.n1" as="p" className="text-base md:text-lg leading-relaxed text-white/80 font-light border-l-2 border-[var(--jaune-or)] pl-6">
                {TEXT['contact.n1']}
              </EditableText>
              <EditableText id="contact.n2" as="p" className="text-sm md:text-base leading-relaxed text-white/60 font-light pl-6">
                {TEXT['contact.n2']}
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      <Parcours />

      {/* ─── Form + info ─── */}
      <section
        id="form"
        ref={formRef}
        className="reveal bg-[var(--summit-ivory)] py-16 md:py-20"
      >
        <div className="page-container">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            {/* Form */}
            <div className="rounded-2xl border border-[var(--command-border)] bg-[var(--pure-white)] p-6 md:p-8 lg:col-span-7 lg:p-10">

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    label="Nom complet"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Email professionnel"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <FormField
                  label="Organisation (optionnel)"
                  name="organization"
                  type="text"
                  value={form.organization}
                  onChange={handleChange}
                />
                <div>
                  <label
                    htmlFor="topic"
                    className="mb-1.5 block font-primary text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--mauve-60)]"
                  >
                    Sujet
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[var(--command-border)] bg-[var(--pure-white)] px-4 py-3 font-primary text-sm text-[var(--night)] outline-none transition-colors duration-200 focus:border-[var(--mauve)]"
                  >
                    {TOPICS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-primary text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--mauve-60)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-[var(--command-border)] bg-[var(--pure-white)] px-4 py-3 font-primary text-sm text-[var(--night)] outline-none transition-colors duration-200 focus:border-[var(--mauve)]"
                    placeholder="Décrivez votre demande, votre horizon et vos contraintes éventuelles."
                  />
                </div>
                <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                  <p className="max-w-xs font-primary text-xs font-light leading-relaxed text-[var(--night-40)]">
                    <EditableText id="contact.form.privacy">
                      En envoyant ce message, vous acceptez que vos données soient utilisées pour
                      répondre à votre demande.
                    </EditableText>
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--jaune-or)] px-6 py-3 font-primary text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#062421]"
                  >
                    <EditableText id="contact.form.submit" as="span">Envoyer la demande</EditableText>
                    <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Info panel */}
            <aside className="flex flex-col gap-4 lg:col-span-5">
              <div
                className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-[var(--everest-green)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-60"
                  style={{
                    background:
                      'radial-gradient(ellipse at top right, rgba(182,138,62,0.12) 0%, transparent 65%)',
                  }}
                />
                <div className="relative">
                  <EditableText id="contact.coordonnees.heading" as="h2" className="mb-3 font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--jaune-or)]">
                    {TEXT['contact.coordonnees.heading']}
                  </EditableText>
                  <ul className="space-y-5 text-white/75">
                    <InfoRow icon={FiMapPin}>
                      <p data-cms-id="contact.coordonnees.n1" className="leading-relaxed">
                        {coord.text.split(LINKABLE).map((part, i) => {
                          if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
                          const href = part.includes('@') ? `mailto:${part}` : `tel:${part.replace(/\s/g, '')}`;
                          return (
                            <a key={i} href={href} className="underline-offset-4 transition-colors hover:text-[var(--jaune-or)] hover:underline">
                              {part}
                            </a>
                          );
                        })}
                      </p>
                    </InfoRow>
                  </ul>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ───────── Sub-components ───────── */

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
}) => (
  <div>
    <label
      htmlFor={name}
      className="mb-1.5 block font-primary text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--mauve-60)]"
    >
      {label}
      {required && <span className="ml-1 text-[var(--jaune-or)]">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-xl border border-[var(--command-border)] bg-[var(--pure-white)] px-4 py-3 font-primary text-sm text-[var(--night)] outline-none transition-colors duration-200 focus:border-[var(--mauve)]"
    />
  </div>
);

const InfoRow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({
  icon: Icon,
  children,
}) => (
  <li className="flex items-start gap-3">
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04]">
      <Icon className="text-[13px] text-[var(--jaune-or)]" aria-hidden />
    </span>
    <div className="min-w-0 flex-1 font-primary text-sm font-light leading-relaxed">
      {children}
    </div>
  </li>
);
