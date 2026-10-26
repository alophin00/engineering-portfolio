import { site } from "@/data/site";
import ContactLinks from "@/components/ui/ContactLinks";

export default function ContactCTA() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <h2 id="contact-title" className="max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.03em]">
          Let’s Build Something Meaningful.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          I’m looking for internships and research opportunities in medical devices, robotics and R&amp;D. If you’re working on something that helps people, I’d like to hear about it.
        </p>
        <div className="mt-10">
          <ContactLinks />
        </div>
        {site.showPlaceholders && !site.contact.email && (
          <p className="mt-4 font-mono text-[11px] text-muted">Contact links appear here once they’re added to data/site.ts.</p>
        )}
      </div>
    </section>
  );
}
