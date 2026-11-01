import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LogIn, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import LoadingBlock from "@/components/LoadingBlock";

export default function Questionarios() {
  const { user } = useAuth();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    let ativo = true;
    const email = user?.email;

    const carregar = async () => {
      const [eras, agregado, resultados] = await Promise.all([
        base44.entities.Era.list("ordem", 20),
        base44.entities.Pergunta.aggregate({ groupBy: "categoria" }).catch(() => ({ rows: [] })),
        email
          ? base44.entities.Resultado.filter(
              { email_utilizador: email },
              { sort: "-created_date", limit: 12 }
            )
          : Promise.resolve({ items: [] }),
      ]);
      if (!ativo) return;

      const contagens = {};
      (agregado.rows || []).forEach((linha) => {
        contagens[linha.categoria] = linha.count;
      });

      setDados({
        eras: eras.filter((era) => contagens[era.nome] > 0),
        contagens,
        resultados: resultados.items,
      });
    };

    carregar();
    return () => {
      ativo = false;
    };
  }, [user?.email]);

  if (!dados) return <LoadingBlock label="A preparar os questionários" />;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">Estudo</p>
        <h1 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight sm:text-5xl">
          Questionários de história
        </h1>
        <p className="mt-5 leading-relaxed text-foreground/70">
          Escolha uma era e responda. Cada pergunta é corrigida na hora, com a explicação da resposta
          certa — e o resultado fica guardado na sua conta.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dados.eras.map((era) => (
          <Link
            key={era.id}
            to={`/questionario/${encodeURIComponent(era.nome)}`}
            className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-muted">
              <Sparkles className="h-4 w-4 text-gold" />
            </span>
            <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {era.periodo}
            </p>
            <h2 className="mt-2 font-heading text-xl font-semibold leading-snug">{era.nome}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">{era.resumo}</p>
            <span className="mt-5 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{dados.contagens[era.nome]} perguntas</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                Começar
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold">Os teus resultados</h2>
        {user ? (
          dados.resultados.length === 0 ? (
            <p className="mt-4 text-foreground/70">
              Ainda não fizeste nenhum questionário. O primeiro resultado aparece aqui.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {dados.resultados.map((resultado) => (
                <li key={resultado.id} className="flex flex-wrap items-center justify-between gap-2 py-4">
                  <span className="font-medium">{resultado.categoria}</span>
                  <span className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      <span className="font-heading text-lg font-semibold text-primary">{resultado.acertos}</span>
                      /{resultado.total}
                    </span>
                    <span>{new Date(resultado.created_date).toLocaleDateString("pt-PT")}</span>
                  </span>
                </li>
              ))}
            </ul>
          )
        ) : (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-muted/60 px-6 py-5">
            <p className="text-foreground/80">
              Entra na tua conta para guardar os resultados e acompanhar o teu progresso.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <LogIn className="h-3.5 w-3.5" />
              Entrar
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}