import React,{useEffect,useState}from"react";
import{Link}from"react-router-dom";
import{ArrowRight,RefreshCw}from"lucide-react";
import{base44}from"@/api/base44Client";
import EraCard from"@/components/EraCard";
import EventoCard from"@/components/EventoCard";
import TemaCard from"@/components/TemaCard";
import SectionHeading from"@/components/SectionHeading";
import LoadingBlock from"@/components/LoadingBlock";
import HomeHero from"@/components/home/HomeHero";
import ExploreGrid from"@/components/home/ExploreGrid";
import PovosBand from"@/components/home/PovosBand";
import MonumentosBand from"@/components/home/MonumentosBand";
import QuizBand from"@/components/home/QuizBand";

function espalhar(lista,quantos){if(!Array.isArray(lista)||lista.length<=quantos)return lista||[];return Array.from({length:quantos},(_,i)=>lista[Math.round(i*(lista.length-1)/(quantos-1))])}

export default function Home(){
  const[dados,setDados]=useState(null);
  const[erro,setErro]=useState(false);
  const[tentativa,setTentativa]=useState(0);

  useEffect(()=>{
    let ativo=true;
    const carregar=async()=>{
      setErro(false);
      const resultados=await Promise.allSettled([
        base44.entities.Era.list("ordem",20),
        base44.entities.Evento.filter({destaque:true},{sort:"ano",limit:40}),
        base44.entities.Tema.list("ordem",3),
        base44.entities.Etnia.list("ordem",4),
        base44.entities.Monumento.list("ordem",3),
        base44.entities.Evento.count(),
        base44.entities.Pergunta.count(),
        base44.entities.Tema.count()
      ]);
      if(!ativo)return;

      const valor=(i,padrao)=>resultados[i].status==="fulfilled"?resultados[i].value:padrao;
      const houveFalha=resultados.some(r=>r.status==="rejected");
      if(houveFalha){
        console.error("Alguns dados da página inicial não puderam ser carregados",resultados.filter(r=>r.status==="rejected"));
        setErro(true);
      }

      const destaquesResposta=valor(1,{items:[]});
      const destaques=Array.isArray(destaquesResposta)?destaquesResposta:(destaquesResposta?.items||[]);
      setDados({
        eras:valor(0,[]),
        destaques:espalhar(destaques,6),
        temas:valor(2,[]),
        etnias:valor(3,[]),
        monumentos:valor(4,[]),
        eventos:valor(5,0),
        perguntas:valor(6,0),
        totalTemas:valor(7,0)
      });
    };
    carregar().catch(error=>{
      console.error("Falha inesperada ao carregar a página inicial",error);
      if(ativo){setErro(true);setDados({eras:[],destaques:[],temas:[],etnias:[],monumentos:[],eventos:0,perguntas:0,totalTemas:0});}
    });
    return()=>{ativo=false};
  },[tentativa]);

  if(!dados)return <LoadingBlock label="A reunir a memória do país"/>;

  const numeros=[
    {valor:dados.eras.length,rotulo:"eras históricas"},
    {valor:dados.eventos,rotulo:"momentos na linha do tempo"},
    {valor:dados.totalTemas,rotulo:"temas para ler"},
    {valor:dados.perguntas,rotulo:"perguntas de estudo"}
  ];

  return <div>
    {erro&&<div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"><span>Alguns conteúdos não puderam ser carregados agora. A página continua disponível.</span><button type="button" onClick={()=>{setDados(null);setTentativa(v=>v+1)}} className="inline-flex shrink-0 items-center gap-2 font-medium underline underline-offset-2"><RefreshCw className="h-4 w-4"/>Tentar novamente</button></div>}
    <HomeHero numeros={numeros}/>
    <ExploreGrid/>
    <section className="mx-auto max-w-6xl px-5 pb-16"><SectionHeading eyebrow="As eras" title="Os grandes períodos do país" description="Cada era reúne os acontecimentos que a definiram, do primeiro reino ao presente." action={<Link to="/linha-do-tempo" className="link-arrow">Ver tudo<ArrowRight className="h-3.5 w-3.5"/></Link>}/><div className="hide-scrollbar -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4">{dados.eras.map((era,indice)=><EraCard key={era.id} era={era} index={indice}/>)}</div></section>
    <section className="border-y border-border bg-muted/50"><div className="mx-auto max-w-6xl px-5 py-16"><SectionHeading eyebrow="Marcos" title="Momentos que mudaram o rumo do país" description="Uma seleção de acontecimentos que os guineenses continuam a contar."/><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{dados.destaques.map(evento=><EventoCard key={evento.id} evento={evento}/>)}</div></div></section>
    <div className="pt-16"><PovosBand etnias={dados.etnias}/></div>
    <MonumentosBand monumentos={dados.monumentos}/>
    <section className="mx-auto max-w-6xl px-5 pb-16"><SectionHeading eyebrow="Enciclopédia" title="A trama temática" description="Povos, línguas, música, geografia e figuras: os fios que atravessam a história." action={<Link to="/temas" className="link-arrow">Todos os temas<ArrowRight className="h-3.5 w-3.5"/></Link>}/><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{dados.temas.map(tema=><TemaCard key={tema.id} tema={tema}/>)}</div></section>
    <QuizBand perguntas={dados.perguntas}/>
  </div>;
}
