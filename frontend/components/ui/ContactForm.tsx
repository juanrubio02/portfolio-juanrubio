"use client";

import { FormEvent, useState } from "react";

type ContactState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

const initialState: ContactState = {
  status: "idle",
  message: ""
};

export function ContactForm() {
  const [state, setState] = useState<ContactState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? "") || null,
      message: String(form.get("message") ?? "")
    };

    setState({ status: "submitting", message: "Enviando mensaje..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { message?: string; detail?: string };

      if (!response.ok) {
        setState({
          status: "error",
          message: data.detail ?? "No se pudo enviar el mensaje."
        });
        return;
      }

      event.currentTarget.reset();
      setState({
        status: "success",
        message: data.message ?? "Mensaje enviado correctamente."
      });
    } catch {
      setState({
        status: "error",
        message: "El backend no está disponible ahora mismo."
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-slate-500">Nombre</span>
          <input
            name="name"
            required
            minLength={2}
            className="ghost-border rounded-2xl bg-surface-high px-4 py-3 text-white outline-none transition focus:border-primary"
          />
        </label>
        <label className="grid gap-2">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-slate-500">Email</span>
          <input
            name="email"
            type="email"
            required
            className="ghost-border rounded-2xl bg-surface-high px-4 py-3 text-white outline-none transition focus:border-primary"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-slate-500">Empresa</span>
        <input
          name="company"
          className="ghost-border rounded-2xl bg-surface-high px-4 py-3 text-white outline-none transition focus:border-primary"
        />
      </label>

      <label className="grid gap-2">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-slate-500">Mensaje</span>
        <textarea
          name="message"
          required
          minLength={20}
          rows={5}
          className="ghost-border rounded-2xl bg-surface-high px-4 py-3 text-white outline-none transition focus:border-primary"
        />
      </label>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="rounded-full bg-primary px-6 py-3 font-label text-sm font-bold uppercase tracking-[0.24em] text-slate-950 shadow-glow transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state.status === "submitting" ? "Enviando" : "Enviar mensaje"}
        </button>
        <p
          className={`text-sm ${
            state.status === "error"
              ? "text-red-300"
              : state.status === "success"
                ? "text-secondary"
                : "text-slate-500"
          }`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
