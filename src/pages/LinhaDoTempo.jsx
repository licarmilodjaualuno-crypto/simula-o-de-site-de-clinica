import React,{useEffect,useState}from"react";
import{Link}from"react-router-dom";
import{RefreshCw}from"lucide-react";
import{base44}from"@/api/base44Client";
import TimelineEvento from"@/components/TimelineEvento";
import LoadingBlock from"@/components/LoadingBlock";

const BARRA={ocre:"bg-tom-ocre",azul:"bg-tom-azul",verde:"bg-tom-verde",vermelho:"bg-tom-vermelho"};

export default function LinhaDoTempo(){
  const[dados,setDados]=useState(null);
  const[erro,setErro]=useState(false);
  const[tentativa,setTentativa]=useState(0);

  useEffect(()=>{
    let ativo=true;
    const carregar=async()=>{
      setErro(false);
      const resultados=await Promise.allSettled([
        base44.entities.Era.list("ordem",20),
        base44.entities.Evento.list("ano",300)
      ]);
      if(!ativo)return;

      const eras=resultados[0].status==="fulfilled"?resultados[0].value:[];
      const eventos=resultados[1].status==="fulfilled"?resultados[1].value:[];
      if(resultados.some(r=>r.status==="rejected")){
        console.error("Falha ao carregar parte da linha do tempo",resultados.filter(r=>r.status==="rejected"));
        setErro(true);
      }
      setDados({eras,eventos});
    };

    carregar().catch(error=>{
      console.error("Falha inesperada ao carregar linha do tempo",error);
      if(ativo){setErro(true);setDados({eras:[],eventos:[]});}
    });
    return()=>{ativo=false};
  },[tentativa]);

  if(!dados)return <LoadingBlock label="A ordenar séculos de história"/>;

  return <div className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
    {erro&&<div className="mb-8 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"><span>Alguns dados da linha do tempo não puderam ser carregados.</span><button type="button" onClick={()=>{setDados(null);setTentativa(v=>v+1)}} className="inline-flex shrink-0 items-center gap-2 font-medium underline underline-offset-2"><RefreshCw className="h-4 w-4"/>Tentar novamente</button></div>}
    <header className="max-w-2xl"><p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">Cronologia</p><h1 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight sm:text-5xl">A linha do tempo da Guiné-Bissau</h1><p className="mt-5 leading-relaxed text-foreground/70">Dos reinos antigos e do comércio atlântico à luta de libertação, à independência de 1973 e ao país de hoje. Percurso cronológico por {dados.eventos.length} acontecimentos.</p></header>
    {dados.eras.length===0&&<div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 text-sm text-foreground/70">A linha do tempo está disponível, mas os dados históricos ainda não foram carregados desta vez.</div>}
    {dados.eras.map(era=>{const lista=dados.eventos.filter(evento=>evento.era_id===era.id);if(!lista.length)return null;return <section key={era.id} className="mt-16"><div className="mb-7"><span className={`block h-1 w-16 ${BARRA[era.tom]||BARRA.ocre}`}/><p className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{era.periodo}</p><h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">{era.nome}</h2><p className="mt-3 max-w-2xl leading-relaxed text-foreground/70">{era.resumo}</p><Link to={`/era/${era.id}`} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">Ler esta era em detalhe</Link></div><ol>{lista.map(evento=><TimelineEvento key={evento.id} evento={evento}/>)}</ol></section>})}
  </div>;
}
