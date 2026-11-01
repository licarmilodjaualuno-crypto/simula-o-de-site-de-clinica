import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import QuizRunner from "@/components/quiz/QuizRunner";
import LoadingBlock from "@/components/LoadingBlock";

export default function Questionario() {
  const { categoria } = useParams();
  const nome = decodeURIComponent(categoria || "");
  const { user } = useAuth();
  const [perguntas, setPerguntas] = useState(null);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    let ativo = true;
    setPerguntas(null);
    setGuardado(false);
    base44.entities.Pergunta.filter({ categoria: nome }, { sort: "ordem", limit: 30 }).then(
      (pagina) => {
        if (ativo) setPerguntas(pagina.items);
      }
    );
    return () => {
      ativo = false;
    };
  }, [nome]);

  const finalizar = async (acertos, total) => {
    if (!user?.email) return;
    await base44.entities.Resultado.create({
      categoria: nome,
      acertos,
      total,
      email_utilizador: user.email,
      nome_utilizador: user.full_name || "",
    });
    setGuardado(true);
  };

  if (!perguntas) return <LoadingBlock label="A carregar as perguntas" />;

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
      <Link
        to="/questionarios"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Todos os questionários
      </Link>

      <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
        Questionário
      </p>
      <h1 className="mt-4 text-balance font-heading text-3xl font-semibold leading-tight sm:text-4xl">
        {nome}
      </h1>

      <div className="mt-10">
        {perguntas.length === 0 ? (
          <p className="rounded-lg border border-border bg-card p-8 text-foreground/70">
            Ainda não há perguntas para este tema.
          </p>
        ) : (
          <QuizRunner perguntas={perguntas} onFinish={finalizar} />
        )}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {guardado
          ? "Resultado guardado na tua conta."
          : user
            ? "O resultado fica guardado assim que terminares."
            : "Entra na tua conta para guardar os resultados."}
      </p>
    </div>
  );
}