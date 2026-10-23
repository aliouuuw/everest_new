import { useState } from 'react';
import { EditableText } from '../cms';
import { ArrowUpRight, N1, N2, PageHero } from '../components/Referentiel';
import { Coordonnees, Parcours } from '../components/Sections/RelationReferentiel';

/** Square fields on the home rule; the gold focus ring comes from the global token. */
const FIELD_CLASS =
  'w-full min-h-12 rounded-none border border-[color-mix(in_srgb,var(--home-ink)_55%,transparent)] bg-[var(--home-white)] px-4 py-3 text-base text-[var(--home-ink)] transition-colors duration-200 hover:border-[var(--home-mid)] focus:border-[var(--home-ink)]';
const LABEL_CLASS = 'mb-2 block text-[14px] font-semibold text-[var(--home-ink)]';

const TOPICS = [
  { value: 'relation', label: 'Entrer en relation' },
  { value: 'opportunites', label: 'Accéder aux opportunités en cours' },
  { value: 'mandat', label: 'Gestion sous mandat / Private Office' },
  { value: 'emetteur', label: 'Émettre / structurer une opération' },
  { value: 'institution', label: 'Partenariat institutionnel' },
  { value: 'autre', label: 'Autre demande' },
];

export const ContactPage = () => {
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
    <div className="bg-[var(--pure-white)] text-[var(--night)]">
      {/* Referential V2.1 §8: N1/N2, then the four steps, then the form and the contact details */}
      <PageHero title="Contact / Devenir client">
        <N1 id="contact.n1" tone="dark" as="p" size="statement" />
        <N2 id="contact.n2" tone="dark" />
      </PageHero>

      <Parcours tone="light" />

      {/* ─── Form + info ─── */}
      <section id="form" className="bg-[var(--home-paper)] py-12 md:py-20 lg:py-28">
        <div className="page-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    label="Nom complet"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Email professionnel"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <FormField
                  label="Organisation (optionnel)"
                  name="organization"
                  type="text"
                  autoComplete="organization"
                  value={form.organization}
                  onChange={handleChange}
                />
                <div>
                  <label
                    htmlFor="topic"
                    className={LABEL_CLASS}
                  >
                    Sujet
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className={FIELD_CLASS}
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
                    className={LABEL_CLASS}
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
                    className={`${FIELD_CLASS} resize-none`}
                    placeholder="Décrivez votre demande, votre horizon et vos contraintes éventuelles."
                  />
                </div>
                <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                  <p className="max-w-xs text-[13px] leading-[1.55] text-[var(--home-mid)]">
                    <EditableText id="contact.form.privacy">
                      En envoyant ce message, vous acceptez que vos données soient utilisées pour
                      répondre à votre demande.
                    </EditableText>
                  </p>
                  <button type="submit" className="home-button cursor-pointer">
                    <EditableText id="contact.form.submit" as="span">Envoyer la demande</EditableText>
                    <ArrowUpRight />
                  </button>
                </div>
              </form>
            </div>

            {/* Info panel: §8 « Coordonnées » */}
            <aside className="antialiased bg-[var(--home-ink)] p-6 md:p-10 lg:col-span-5 lg:self-start">
              <Coordonnees tone="dark" />
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
  autoComplete?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  autoComplete,
}) => (
  <div>
    <label
      htmlFor={name}
      className={LABEL_CLASS}
    >
      {label}
      {required && <span aria-hidden className="ml-1 text-[var(--home-gold)]">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      className={FIELD_CLASS}
    />
  </div>
);
