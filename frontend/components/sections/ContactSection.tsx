export function ContactSection() {
  return (
    <section id="contact" className="bg-surface py-24">
      <div className="section-shell">
        <aside className="ghost-border h-fit rounded-[32px] bg-surface-low p-8">
          <p className="eyebrow mb-4">Contacto</p>
          <h3 className="font-display text-4xl font-bold text-white">Contacto directo.</h3>
          <p className="mt-4 rounded-2xl border border-white/10 bg-surface-high px-5 py-4 text-lg font-semibold leading-8 text-white">
            Desarrollador backend en Python abierto a nuevas oportunidades. Puedes
            contactarme directamente por email o LinkedIn.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Si quieres contactarme, aquí tienes mis enlaces principales: email, LinkedIn y GitHub.
          </p>
          <div className="mt-8 grid gap-4 text-sm text-slate-300">
            <a
              href="mailto:juanrrmuel@gmail.com"
              className="rounded-xl px-1 py-1 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              juanrrmuel@gmail.com
            </a>
            <a
              href="https://github.com/juanrubio02"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-1 py-1 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              github.com/juanrubio02
            </a>
            <a
              href="https://www.linkedin.com/in/juan-rubio-499a2b293/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-1 py-1 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              linkedin.com/in/juan-rubio-499a2b293
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
