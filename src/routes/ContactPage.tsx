import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { EditableText } from '../cms';
import { N1, N2, PageHero } from '../components/Referentiel';
import { Coordonnees, Parcours } from '../components/Sections/RelationReferentiel';

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
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
      {/* Referential V2.1 §8: N1/N2, then the four steps, then the form and the contact details */}
      <PageHero title="Contact / Devenir client">
        <N1 id="contact.n1" tone="dark" as="p" size="statement" />
        <N2 id="contact.n2" tone="dark" />
      </PageHero>

      <Parcours tone="light" />

      {/* ─── Form + info ─── */}
      <section id="form" className="bg-[var(--summit-ivory)] py-16 md:py-20">
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

            {/* Info panel: §8 « Coordonnées » */}
            <aside className="rounded-2xl bg-[var(--everest-green)] p-6 md:p-8 lg:col-span-5 lg:self-start">
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
