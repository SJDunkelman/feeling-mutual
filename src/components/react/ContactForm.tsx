import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
  textColour?: string;
}

export default function ContactForm({ textColour = 'sandybrown' }: ContactFormProps) {
  const [formSent, setFormSent] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs.sendForm('service_pnk4y5c', 'template_r9yn5yx', form.current, 'juYRxtVyRMKhElqaf')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    emailjs.sendForm('service_pnk4y5c', 'template_glfnrtt', form.current, 'juYRxtVyRMKhElqaf')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    form.current.reset();
    setFormSent(true);
  };

  return (
    <div className={`text-${textColour}`}>
      <form ref={form} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/25 border border-current text-current placeholder-current/50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/25 border border-current text-current placeholder-current/50"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1">Service</label>
          <select
            name="service"
            id="service"
            className="w-full px-4 py-2 rounded-lg bg-white/25 border border-current text-maroon"
          >
            <option value="Full Service">Full Service</option>
            <option value="Project Design">Project Design</option>
            <option value="Moderation/Reporting">Moderation/Reporting</option>
            <option value="Training">Training</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            id="message"
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-white/25 border border-current text-current placeholder-current/50"
            placeholder="Tell us about your project..."
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-tomato text-white font-medium rounded-lg hover:bg-tomato/75 transition-colors"
        >
          Send Message
        </button>
      </form>
      {formSent && (
        <p className="mt-4 text-center font-light">Thank you! We'll be in touch soon.</p>
      )}
    </div>
  );
}
