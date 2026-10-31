import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import EtniaCard from "@/components/EtniaCard";
export default function PovosBand({ etnias }) { if (!etnias.length) return null; return <section className="border-y border-border bg-muted/50"><div className="mx-auto max-w-6xl px-5 py-16"><SectionHeading eyebrow="Povos" title="Quem construiu este país" description="Cada povo traz uma língua, uma forma de organizar a vida e um conjunto próprio de práticas e costumes." action={<Link to="/etnias" className="link-arrow">Todos os povos<ArrowRight className="h-3.5 w-3.5" /></Link>} /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{etnias.map((etnia) => <EtniaCard key={etnia.id} etnia={etnia} />)}</div></div></section>; }
