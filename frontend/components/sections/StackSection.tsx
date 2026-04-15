import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Technology } from "@/types/api";

type StackSectionProps = {
  technologies: Technology[];
};

export function StackSection({ technologies }: StackSectionProps) {
  return (
    <section id="stack" className="bg-surface py-24">
      <div className="section-shell space-y-14">
        <SectionHeading
          eyebrow="Tecnologías"
          title="Tecnologías con las que trabajo en backend."
          description="Aquí muestro solo herramientas presentes de verdad en este portfolio y que puedo explicar con detalle en una entrevista."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {technologies.map((technology) => (
            <article
              key={technology.id}
              className="ghost-border rounded-3xl bg-surface-low p-5 transition-colors hover:bg-surface-high sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {technology.name}
                </h3>
                {technology.highlight ? (
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-label font-bold uppercase tracking-[0.22em] text-secondary">
                    Clave
                  </span>
                ) : null}
              </div>
              <p className="mt-2 font-label text-[11px] uppercase tracking-[0.24em] text-slate-500">
                {technology.category}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
