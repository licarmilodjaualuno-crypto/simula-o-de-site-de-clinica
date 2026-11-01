import React from"react";
import{Link,useParams}from"react-router-dom";
import{ArrowLeft,Clock}from"lucide-react";
import Prose from"@/components/Prose";
import{temasLocal,encontrarTema}from"@/data/temas-local";

function tempoLeitura(texto){const palavras=(texto||"").trim().split(/\s+/).filter(Boolean).length;return Math.max(1,Math.round(palavras/200))}

export default function TemaDetalhe(){
  const{id}=useParams();
  const tema=encontrarTema(id);
  if(!tema)return <div className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="font-heading text-3xl font-semibold">Tema não encontrado</h1><Link to="/temas" className="mt-5 inline-block text-primary hover:underline">Voltar aos temas</Link></div>;
  const relacionados=temasLocal.filter(item=>item.categoria===tema.categoria&&item.id!==tema.id).slice(0,3);
  return <article>
    <div className="bg-foreground text-background"><div className="mx-auto w-full max-w-3xl px-5 pb-12 pt-14 sm:pt-20"><Link to="/temas" className="inline-flex items-center gap-2 text-[13px] font-medium text-background/70 transition-colors hover:text-background"><ArrowLeft className="h-3.5 w-3.5"/>Todos os temas</Link><p className="mt-8 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold"><span className="h-px w-7 bg-gold"/>{tema.categoria}</p><h1 className="mt-4 text-balance font-heading text-[34px] font-semibold leading-[1.08] sm:text-[46px]">{tema.titulo}</h1><p className="mt-5 flex items-center gap-1.5 text-[12.5px] uppercase tracking-[0.16em] text-background/60"><Clock className="h-3.5 w-3.5"/>Leitura de {tempoLeitura(tema.conteudo)} min</p></div></div>
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-16"><p className="font-heading text-[21px] leading-[1.6] text-foreground/85">{tema.resumo}</p><span className="mt-10 block h-px w-16 bg-gold"/><Prose className="mt-8">{tema.conteudo}</Prose></div>
    {relacionados.length>0&&<div className="border-t border-border bg-muted/50"><div className="mx-auto max-w-6xl px-5 py-16"><h2 className="font-heading text-2xl font-semibold">Mais em {tema.categoria}</h2><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{relacionados.map(item=><Link key={item.id} to={`/tema/${item.id}`} className="rounded-xl border border-border bg-card p-5 transition hover:border-primary/40"><h3 className="font-heading text-lg font-semibold">{item.titulo}</h3><p className="mt-2 text-sm leading-6 text-foreground/70">{item.resumo}</p></Link>)}</div></div></div>}
  </article>
}
