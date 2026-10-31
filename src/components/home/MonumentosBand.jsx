import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import MonumentoCard from "@/components/MonumentoCard";
export default function MonumentosBand({ monumentos }) { if (!monumentos.length) return null; return <section className="mx-auto max-w-6xl px-5 py-16"><SectionHeading eyebrow="Património" title="Monumentos e lugares de memória" description="Fortalezas, ruínas coloniais e sítios naturais que guardam capítulos inteiros da história." action={<Link to="/monumentos" className="link-arrow">Ver todos<ArrowRight className="h-3.5 w-3.5" /></Link>} /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{monumentos.map((monumento) => <MonumentoCard key={monumento.id} monumento={monumento} />)}</div></section>; }
