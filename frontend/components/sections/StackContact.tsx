import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Experience, Technology } from "@/types/api";

type StackContactProps = {
  technologies: Technology[];
  experiences: Experience[];
};

const formatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric"
});

function formatPeriod(startDate: string | null, endDate: string | null) {
  if (!startDate && !endDate) {
    return null;
  }

  if (!startDate && endDate) {
    return formatter.format(new Date(endDate));
  }

  const safeStartDate = startDate ?? endDate;
  if (!safeStartDate) {
    return null;
  }

  return `${formatter.format(new Date(safeStartDate))} - ${
    endDate ? formatter.format(new Date(endDate)) : "Present"
  }`;
}

function formatExperienceMeta(item: Experience) {
  return [item.company, item.location, item.employment_type].filter(Boolean).join(" / ");
}

export function StackContact({ technologies, experiences }: StackContactProps) {
  return (
    <section id="stack" className="bg-surface py-24">
      <div className="section-shell grid gap-16 xl:grid-cols-[1fr_0.95fr]">
        <div className="space-y-14">
          <SectionHeading
            eyebrow="Stack"
            title="Tecnologías con las que trabajo en backend."
            description="Aquí muestro solo herramientas que aparecen de verdad en este portfolio y que puedo explicar con detalle en entrevista."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {technologies.map((technology) => (
              <article
                key={technology.id}
                className="ghost-border rounded-3xl bg-surface-low p-6 transition-colors hover:bg-surface-high"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold text-white">{technology.name}</h3>
                  {technology.highlight ? (
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-label font-bold uppercase tracking-[0.22em] text-secondary">
                      Core
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 font-label text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  {technology.category}
                </p>
                <p className="mt-4 text-base leading-7 text-slate-400">{technology.description}</p>
              </article>
            ))}
          </div>

          <div className="space-y-6">
            <p className="font-label text-sm uppercase tracking-[0.3em] text-slate-500">Experiencia</p>
            {experiences.map((item) => (
              <article key={item.id} className="ghost-border rounded-3xl bg-surface-low p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">{item.role}</h3>
                    <p className="mt-1 text-slate-400">{formatExperienceMeta(item)}</p>
                  </div>
                  {formatPeriod(item.start_date, item.end_date) ? (
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                      {formatPeriod(item.start_date, item.end_date)}
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-base leading-7 text-slate-400">{item.summary}</p>
                <ul className="mt-5 grid gap-2 text-sm text-slate-300">
                  {item.achievements.map((achievement) => (
                    <li key={achievement}>- {achievement}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <aside className="ghost-border h-fit rounded-[32px] bg-surface-low p-8 xl:sticky xl:top-28">
          <p className="eyebrow mb-4">Contacto</p>
          <h3 className="font-display text-4xl font-bold text-white">Contacto directo.</h3>
          <p className="mt-4 rounded-2xl border border-white/10 bg-surface-high px-5 py-4 text-lg font-semibold leading-8 text-white">
            Backend Developer (Python) abierto a nuevas oportunidades. Puedes contactarme
            directamente por email o LinkedIn.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Si quieres contactarme, aquí tienes mis enlaces principales. Prefiero mantener esta
            parte simple: email, LinkedIn y GitHub.
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
