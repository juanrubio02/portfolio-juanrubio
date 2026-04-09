import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-surface px-6">
      <div className="max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-5xl font-black text-white">
          Proyecto no encontrado.
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          El identificador solicitado no corresponde a ningún proyecto publicado en el portfolio.
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-label text-sm font-bold uppercase tracking-[0.22em] text-slate-950"
        >
          Volver a proyectos
        </Link>
      </div>
    </main>
  );
}
