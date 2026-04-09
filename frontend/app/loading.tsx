export default function Loading() {
  return (
    <main className="bg-surface">
      <section className="section-shell flex min-h-[70vh] items-center py-20">
        <div className="max-w-2xl space-y-6">
          <p className="eyebrow">Portfolio</p>
          <h1 className="font-display text-5xl font-black tracking-tight text-white md:text-7xl">
            Portfolio loading...
          </h1>
          <p className="text-lg leading-8 text-slate-400">
            Cargando contenido del portfolio.
          </p>
        </div>
      </section>
    </main>
  );
}
