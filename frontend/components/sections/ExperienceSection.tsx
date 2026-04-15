import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Experience } from "@/types/api";

type ExperienceSectionProps = {
  experiences: Experience[];
};

const formatter = new Intl.DateTimeFormat("es-ES", {
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
    endDate ? formatter.format(new Date(endDate)) : "Actualidad"
  }`;
}

function formatExperienceMeta(item: Experience) {
  return [item.company, item.location, item.employment_type].filter(Boolean).join(" / ");
}

function getKeyAchievements(item: Experience) {
  return item.achievements.slice(0, 2);
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="bg-surface py-24">
      <div className="section-shell space-y-14">
        <SectionHeading
          eyebrow="Experiencia"
          title="Experiencia en desarrollo backend."
          description="Trayectoria trabajando con Python, APIs, bases de datos SQL e integraciones para aplicaciones internas y flujos de datos."
        />

        <div className="space-y-6">
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
                {getKeyAchievements(item).map((achievement) => (
                  <li key={achievement}>- {achievement}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
