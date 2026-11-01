import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const COLUNAS = [
  {
    titulo: "História",
    links: [
      { label: "Linha do tempo", to: "/linha-do-tempo" },
      { label: "Início", to: "/" },
    ],
  },
  {
    titulo: "Conhecer",
    links: [
      { label: "Temas", to: "/temas" },
      { label: "Povos e etnias", to: "/etnias" },
      { label: "Monumentos", to: "/monumentos" },
    ],
  },
  {
    titulo: "Estudar",
    links: [{ label: "Questionários", to: "/questionarios" }],
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/50">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Star className="h-3.5 w-3.5 text-gold" fill="currentColor" strokeWidth={0} />
            </span>
            <p className="font-heading text-lg font-semibold">Memória Viva</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70">
            Uma plataforma dedicada à história da Guiné-Bissau, do império de Kaabu à independência e
            ao país de hoje, feita para quem vive no país e para a diáspora.
          </p>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
            História · Povos · Património
          </p>
        </div>
        {COLUNAS.map((coluna) => (
          <div key={coluna.titulo}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {coluna.titulo}
            </p>
            <ul className="mt-4 space-y-2.5">
              {coluna.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-foreground/75 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl">
            Conteúdo compilado a partir de fontes históricas públicas. Para trabalhos académicos,
            confirme sempre com bibliografia especializada.
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} Memória Viva</p>
        </div>
      </div>
    </footer>
  );
}