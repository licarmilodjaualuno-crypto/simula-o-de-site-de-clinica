import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function AnimalCard({ animal }) {
  const capa = (animal.imagens || [])[0];
  return (
    <Link to={`/animal/${animal.id}`} className="card-lift group flex flex-col overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {capa ? <Image src={capa} alt={animal.nome} className="block h-full w-full transition-transform duration-700 group-hover:scale-[1.05]" /> : <div className="flex h-full w-full items-center justify-center bg-primary/5"><span className="font-heading text-5xl font-semibold text-primary/25">{animal.nome.charAt(0)}</span></div>}
        {animal.video_url && <span className="absolute right-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-background backdrop-blur">Vídeo</span>}
      </div>
      <div className="flex flex-1 flex-col p-6"><h3 className="font-heading text-lg font-semibold leading-snug transition-colors group-hover:text-primary">{animal.nome}</h3><p className="mt-1 text-[12.5px] italic text-muted-foreground">{animal.nome_cientifico}</p><p className="mt-3 flex-1 line-clamp-2 text-sm leading-relaxed text-foreground/70">{animal.habitat}</p><span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Ver ficha<ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></div>
    </Link>
  );
}