import { SectionHeading } from "@/components/ui/SectionHeading";

const principles = [
  {
    title: "Contratos claros en la API",
    body: "Prefiero rutas sencillas, validación explícita y respuestas consistentes. Si una API se entiende rápido, también resulta más fácil mantenerla.",
    tags: ["FastAPI", "Pydantic"]
  },
  {
    title: "Código fácil de evolucionar",
    body: "Suelo separar rutas, servicios y acceso a datos para no mezclar responsabilidades. Así es más sencillo cambiar una parte sin afectar al resto.",
    tags: ["Servicios", "SQLAlchemy"]
  },
  {
    title: "Complejidad solo cuando aporta",
    body: "No introduzco colas, workers o integraciones por pura apariencia. Prefiero empezar con una solución clara y añadir complejidad solo cuando el problema lo exige.",
    tags: ["APIs", "Backend"]
  }
];

export function EngineeringPrinciples() {
  return (
    <section id="principles" className="bg-surface py-24">
      <div className="section-shell space-y-14">
        <SectionHeading
          eyebrow="Enfoque"
          title="Forma de trabajar en backend."
          description="El portfolio se centra en APIs, persistencia, procesamiento de datos e integraciones, explicados de forma directa."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="ghost-border rounded-3xl bg-surface-low p-8 transition-colors hover:bg-surface-high"
            >
              <div className="mb-10 h-12 w-12 rounded-2xl bg-primary/10" />
              <h3 className="font-display text-2xl font-bold text-white">{principle.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-400">{principle.body}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {principle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-highest px-3 py-1 text-[10px] font-label uppercase tracking-[0.24em] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
