import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import TemaCard from "@/components/TemaCard";
import LoadingBlock from "@/components/LoadingBlock";
import { Input } from "@/components/ui/input";

export default function Temas() {
  const [temas, setTemas] = useState(null);
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    let ativo = true;
    base44.entities.Tema.list("ordem", 100).then((lista) => {
      if (ativo) setTemas(lista);
    });
    return () => {
      ativo = false;
    };
  }, []);

  const categorias = useMemo(() => {
    if (!temas) return [];
    return ["Todos", ...Array.from(new Set(temas.map((tema) => tema.categoria)))];
  }, [temas]);

  const visiveis = useMemo(() => {
    if (!temas) return [];
    const termo = busca.trim().toLowerCase();
    return temas.filter((tema) => {
      const naCategoria = categoria === "Todos" || tema.categoria === categoria;
      const noTexto =
        !termo ||
        `${tema.titulo} ${tema.resumo || ""} ${tema.conteudo || ""}`.toLowerCase().includes(termo);
      return naCategoria && noTexto;
    });
  }, [temas, categoria, busca]);

  if (!temas) return <LoadingBlock label="A abrir a enciclopédia" />;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">Enciclopédia</p>
        <h1 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight sm:text-5xl">
          Temas da história e da cultura
        </h1>
        <p className="mt-5 leading-relaxed text-foreground/70">
          Os povos e as línguas, a música e o carnaval, as figuras da libertação, o arquipélago dos
          Bijagós e a vida de todos os dias. Procure por assunto ou por palavra.
        </p>
      </header>

      <div className="mt-9 flex flex-col gap-5">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder="Procurar por palavra, nome ou lugar"
            className="h-11 pl-10 text-[15px]"
          />
        </div>

        <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
          {categorias.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategoria(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                categoria === item
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/70 hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {visiveis.length === 0 ? (
        <p className="mt-16 text-center text-foreground/60">Nenhum tema encontrado. Tente outra palavra.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((tema) => (
            <TemaCard key={tema.id} tema={tema} />
          ))}
        </div>
      )}
    </div>
  );
}