import React, { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import MonumentoCard from "@/components/MonumentoCard";
import LoadingBlock from "@/components/LoadingBlock";

export default function Monumentos() {
  const [monumentos, setMonumentos] = useState(null);
  const [tipo, setTipo] = useState("Todos");

  useEffect(() => {
    let ativo = true;
    base44.entities.Monumento.list("ordem", 100).then((lista) => {
      if (ativo) setMonumentos(lista);
    });
    return () => {
      ativo = false;
    };
  }, []);

  const tipos = useMemo(() => {
    if (!monumentos) return [];
    return ["Todos", ...Array.from(new Set(monumentos.map((m) => m.tipo)))];
  }, [monumentos]);

  const visiveis = useMemo(() => {
    if (!monumentos) return [];
    if (tipo === "Todos") return monumentos;
    return monumentos.filter((m) => m.tipo === tipo);
  }, [monumentos, tipo]);

  if (!monumentos) return <LoadingBlock label="A abrir os monumentos" />;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">Património</p>
        <h1 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight sm:text-5xl">
          Monumentos históricos
        </h1>
        <p className="mt-5 leading-relaxed text-foreground/70">
          Fortalezas, memoriais, ruínas e sítios arqueológicos: o património construído que guarda a
          memória do país, dos reinos antigos à independência.
        </p>
      </header>

      <div className="hide-scrollbar mt-9 -mx-5 flex gap-2 overflow-x-auto px-5">
        {tipos.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTipo(item)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
              tipo === item
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground/70 hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {visiveis.length === 0 ? (
        <p className="mt-16 text-center text-foreground/60">Nenhum monumento nesta categoria.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((monumento) => (
            <MonumentoCard key={monumento.id} monumento={monumento} />
          ))}
        </div>
      )}
    </div>
  );
}