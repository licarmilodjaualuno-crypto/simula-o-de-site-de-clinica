import React,{useEffect,useState}from"react";
import{Link}from"react-router-dom";
import{ArrowRight,BookOpen,PawPrint,Landmark,Users,History,RefreshCw}from"lucide-react";
import{base44}from"@/api/base44Client";
import{Image}from"@/components/ui/image";
import LoadingBlock from"@/components/LoadingBlock";

const categorias=[
  {titulo:"História",descricao:"Da formação dos reinos à independência e aos acontecimentos contemporâneos.",to:"/linha-do-tempo",icone:History},
  {titulo:"Povos e etnias",descricao:"Línguas, costumes, tradições e modos de vida dos povos da Guiné-Bissau.",to:"/etnias",icone:Users},
  {titulo:"Fauna",descricao:"Mamíferos, aves, répteis, peixes e outras espécies do país.",to:"/animais",icone:PawPrint},
  {titulo:"Monumentos",descricao:"Lugares, memória, arquitetura e património histórico guineense.",to:"/monumentos",icone:Landmark},
];

function itens(resposta){return Array.isArray(resposta)?resposta:(resposta?.items||[])}

export default function Home(){
  const[dados,setDados]=useState(null);
  const[erro,setErro]=useState(false);
  const[tentativa,setTentativa]=useState(0);

  useEffect(()=>{
    let ativo=true;
    const carregar=async()=>{
      setErro(false);
      const resultados=await Promise.allSettled([
        base44.entities.Evento.filter({destaque:true},{sort:"-ano",limit:7}),
        base44.entities.Tema.list("ordem",6),
        base44.entities.Etnia.list("ordem",4),
        base44.entities.Monumento.list("ordem",4),
        base44.entities.GrupoAnimal.list("ordem",4)
      ]);
      if(!ativo)return;
      const valor=(i,padrao)=>resultados[i].status==="fulfilled"?resultados[i].value:padrao;
      if(resultados.some(r=>r.status==="rejected"))setErro(true);
      setDados({
        eventos:itens(valor(0,[])),
        temas:itens(valor(1,[])),
        etnias:itens(valor(2,[])),
        monumentos:itens(valor(3,[])),
        grupos:itens(valor(4,[]))
      });
    };
    carregar().catch(()=>{if(ativo){setErro(true);setDados({eventos:[],temas:[],etnias:[],monumentos:[],grupos:[]})}});
    return()=>{ativo=false};
  },[tentativa]);

  if(!dados)return <LoadingBlock label="A abrir o blog Raízes da Guiné"/>;

  const principal=dados.eventos[0];
  const secundarios=dados.eventos.slice(1,4);

  return <div>
    {erro&&<div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"><span>Alguns conteúdos não puderam ser carregados agora.</span><button type="button" onClick={()=>setTentativa(v=>v+1)} className="inline-flex items-center gap-2 font-medium underline underline-offset-2"><RefreshCw className="h-4 w-4"/>Tentar novamente</button></div>}

    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <div className="mb-8 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="eyebrow">Blog cultural e educativo</p><h1 className="mt-2 font-heading text-4xl font-semibold leading-tight sm:text-6xl">Raízes da Guiné</h1></div>
          <p className="max-w-xl text-sm leading-relaxed text-foreground/65 sm:text-right">História, povos, fauna, património e memória da Guiné-Bissau reunidos em artigos e páginas de referência.</p>
        </div>

        {principal?<div className="grid gap-7 lg:grid-cols-[1.55fr_.85fr]">
          <Link to={`/evento/${principal.id}`} className="group relative min-h-[420px] overflow-hidden rounded-2xl bg-primary text-primary-foreground">
            {principal.imagem_url&&<Image src={principal.imagem_url} alt={principal.titulo} className="absolute inset-0 h-full w-full opacity-55 transition-transform duration-700 group-hover:scale-105"/>}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"/>
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.25em] text-white/75">Matéria em destaque</p><h2 className="mt-3 max-w-3xl font-heading text-3xl font-semibold leading-tight text-white sm:text-5xl">{principal.titulo}</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{principal.resumo}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">Ler matéria<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></span></div>
          </Link>
          <div className="divide-y divide-border rounded-2xl border border-border bg-background px-6">{secundarios.length?secundarios.map((item,i)=><Link key={item.id} to={`/evento/${item.id}`} className="group block py-6"><p className="text-[11px] font-semibold uppercase tracking-[.2em] text-secondary">Leitura {i+1}</p><h3 className="mt-2 font-heading text-xl font-semibold leading-snug group-hover:text-primary">{item.titulo}</h3><p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/65">{item.resumo}</p></Link>):<div className="py-8 text-sm text-muted-foreground">Novas matérias em preparação.</div>}</div>
        </div>:<div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">Os destaques históricos aparecerão aqui.</div>}
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="mb-7 flex items-end justify-between"><div><p className="eyebrow">Explorar</p><h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">Categorias do blog</h2></div></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{categorias.map(c=>{const Icone=c.icone;return <Link key={c.to} to={c.to} className="card-lift group p-6"><Icone className="h-6 w-6 text-primary"/><h3 className="mt-5 font-heading text-xl font-semibold">{c.titulo}</h3><p className="mt-2 text-sm leading-relaxed text-foreground/65">{c.descricao}</p><span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Abrir seção<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"/></span></Link>})}</div>
    </section>

    <section className="border-y border-border bg-muted/45"><div className="mx-auto max-w-6xl px-5 py-14"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="eyebrow">Leituras</p><h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">Temas para conhecer melhor o país</h2></div><Link to="/temas" className="link-arrow">Ver todos<ArrowRight className="h-4 w-4"/></Link></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{dados.temas.slice(0,6).map(tema=><Link key={tema.id} to={`/tema/${tema.id}`} className="card-lift group overflow-hidden"><div className="h-44 overflow-hidden bg-muted">{tema.imagem_url?<Image src={tema.imagem_url} alt={tema.titulo} className="h-full w-full transition-transform duration-700 group-hover:scale-105"/>:<div className="flex h-full items-center justify-center"><BookOpen className="h-8 w-8 text-primary/30"/></div>}</div><div className="p-5"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-secondary">{tema.categoria||"Tema"}</p><h3 className="mt-2 font-heading text-xl font-semibold">{tema.titulo}</h3><p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/65">{tema.resumo}</p></div></Link>)}</div></div></section>

    <section className="mx-auto max-w-6xl px-5 py-14"><div className="grid gap-10 lg:grid-cols-2"><div><div className="mb-6"><p className="eyebrow">Povos</p><h2 className="mt-2 font-heading text-3xl font-semibold">Etnias e culturas</h2></div><div className="space-y-3">{dados.etnias.map(etnia=><Link key={etnia.id} to={`/etnia/${etnia.id}`} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 transition hover:border-primary/30"><div><h3 className="font-heading text-lg font-semibold">{etnia.nome}</h3><p className="mt-1 text-sm text-foreground/60">{etnia.regiao}</p></div><ArrowRight className="h-4 w-4 text-primary"/></Link>)}</div><Link to="/etnias" className="link-arrow mt-5">Conhecer todos os povos<ArrowRight className="h-4 w-4"/></Link></div><div><div className="mb-6"><p className="eyebrow">Património</p><h2 className="mt-2 font-heading text-3xl font-semibold">Monumentos e lugares</h2></div><div className="space-y-3">{dados.monumentos.map(item=><Link key={item.id} to={`/monumento/${item.id}`} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 transition hover:border-primary/30"><div><h3 className="font-heading text-lg font-semibold">{item.nome}</h3><p className="mt-1 text-sm text-foreground/60">{item.cidade}</p></div><ArrowRight className="h-4 w-4 text-primary"/></Link>)}</div><Link to="/monumentos" className="link-arrow mt-5">Ver património<ArrowRight className="h-4 w-4"/></Link></div></div></section>
  </div>;
}
