import { useState } from 'react';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { contactLinks } from '../utils/content';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-10">
      <SectionHeader title="Contact" subtitle="Reach out for collaborations, workshops, partnerships, and joining details." />

      <Card>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 outline-none transition focus:border-accent"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 outline-none transition focus:border-accent"
          />
          <textarea
            name="message"
            rows="5"
            required
            placeholder="Message"
            className="rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 outline-none transition focus:border-accent"
          />
          <button type="submit" className="btn-primary w-fit">
            Send Message
          </button>
          {submitted ? <p className="text-sm text-accent2">Thanks. Your message has been noted.</p> : null}
        </form>
      </Card>

      <Card>
        <h2 className="mb-3 text-xl font-semibold">Social Links</h2>
        <div className="flex flex-wrap gap-4">
          {contactLinks.map(([label, href]) => (
            <a key={label} href={href} className="btn-secondary text-sm" target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ContactPage;