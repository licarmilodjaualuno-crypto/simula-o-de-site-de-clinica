import React,{useMemo,useState}from"react";
import{Link}from"react-router-dom";
import{ArrowRight}from"lucide-react";
import{Input}from"@/components/ui/input";
import{temasLocal}from"@/data/temas-local";

export default function Temas(){
  const[busca,setBusca]=useState("");
  const[categoria,setCategoria]=useState("Todos");
  const categorias=["Todos",...new Set(temasLocal.map(t=>t.categoria))];
  const visiveis=useMemo(()=>temasLocal.filter(t=>(categoria==="Todos"||t.categoria===categoria)&&(`${t.titulo} ${t.resumo}`.toLowerCase().includes(busca.toLowerCase()))),[busca,categoria]);
  return <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
    <header className="max-w-2xl"><p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">Temas</p><h1 className="mt-4 font-heading text-4xl font-semibold sm:text-5xl">Conhecer a Guiné-Bissau por assunto</h1><p className="mt-5 leading-relaxed text-foreground/70">Textos introdutórios sobre cultura, história, território, sociedade, património e natureza.</p></header>
    <div className="mt-9 max-w-md"><Input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Procurar um tema"/></div>
    <div className="mt-5 flex flex-wrap gap-2">{categorias.map(c=><button key={c} onClick={()=>setCategoria(c)} className={`rounded-full border px-4 py-2 text-sm ${categoria===c?"border-primary bg-primary text-primary-foreground":"border-border"}`}>{c}</button>)}</div>
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visiveis.map(t=><Link key={t.id} to={`/tema/${t.id}`} className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/40"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-secondary">{t.categoria}</p><h2 className="mt-2 font-heading text-xl font-semibold">{t.titulo}</h2><p className="mt-3 text-sm leading-6 text-foreground/70">{t.resumo}</p><span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Ler tema<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"/></span></Link>)}</div>
  </div>
}
