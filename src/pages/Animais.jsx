import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PawPrint } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import LoadingBlock from "@/components/LoadingBlock";

export default function Animais() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      const [grupos, contagens] = await Promise.all([
        base44.entities.GrupoAnimal.list("ordem", 20),
        base44.entities.Animal.aggregate({ groupBy: "grupo_slug" }),
      ]);
      if (!ativo) return;
      const mapa = {};
      (contagens?.rows || []).forEach((linha) => {
        mapa[linha.grupo_slug] = linha.count;
      });
      setDados({ grupos, mapa });
    };

    carregar();
    return () => {
      ativo = false;
    };
  }, []);

  if (!dados) return <LoadingBlock label="A abrir a fauna da Guiné-Bissau" />;

  return (
    <div>
      <section className="border-b border-border bg-muted/50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="eyebrow flex items-center gap-2.5">
            <span className="h-px w-7 bg-gold" aria-hidden="true" />
            Fauna
          </p>
          <h1 className="mt-4 max-w-3xl text-balance font-heading text-[38px] font-semibold leading-[1.08] sm:text-[52px]">
            Os animais da Guiné-Bissau, grupo a grupo
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-foreground/70">
            Escolhe um grupo — mamíferos, aves, répteis, anfíbios, peixes, vida marinha ou
            invertebrados — para ver todas as espécies do país, com fotografias, vídeos e informação
            sobre onde vivem.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dados.grupos.map((grupo) => {
            const total = dados.mapa[grupo.slug] || 0;
            return (
              <Link
                key={grupo.id}
                to={`/animais/${grupo.slug}`}
                className="card-lift group flex flex-col overflow-hidden"
              >
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  {grupo.imagem_url ? (
                    <Image
                      src={grupo.imagem_url}
                      alt={grupo.nome}
                      className="block h-full w-full transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/5">
                      <PawPrint className="h-8 w-8 text-primary/30" />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
                    {total} {total === 1 ? "espécie" : "espécies"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-heading text-xl font-semibold">{grupo.nome}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
                    {grupo.resumo}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Entrar no grupo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}