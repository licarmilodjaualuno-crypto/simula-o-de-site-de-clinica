import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  PawPrint,
  Landmark,
  Users,
  History,
  Map,
  Sparkles,
} from "lucide-react";

const categorias = [
  {
    titulo: "História",
    descricao:
      "Conheça os reinos, os períodos de contacto com outros povos, a luta de libertação, a independência e os acontecimentos que marcaram a formação da Guiné-Bissau.",
    to: "/linha-do-tempo",
    icone: History,
  },
  {
    titulo: "Povos e etnias",
    descricao:
      "Explore a diversidade cultural do país através das suas etnias, línguas, tradições, cerimónias, formas de organização social, música, vestuário e modos de vida.",
    to: "/etnias",
    icone: Users,
  },
  {
    titulo: "Fauna",
    descricao:
      "Descubra os animais presentes no território guineense, desde mamíferos e aves até répteis, peixes e outras espécies ligadas às florestas, savanas, rios e zonas costeiras.",
    to: "/animais",
    icone: PawPrint,
  },
  {
    titulo: "Monumentos",
    descricao:
      "Visite virtualmente lugares históricos, edifícios, memoriais e espaços de grande importância para a memória, a identidade e o património nacional.",
    to: "/monumentos",
    icone: Landmark,
  },
];

const destaques = [
  {
    etiqueta: "História",
    titulo: "Da memória dos povos à construção da nação",
    texto:
      "A história da Guiné-Bissau não começa com a colonização. Muito antes desse período, comunidades organizadas já viviam, comerciavam, cultivavam, criavam animais, transmitiam conhecimentos e construíam tradições que continuam presentes até hoje. O Raízes da Guiné procura apresentar essa história de forma acessível, ligando os períodos antigos aos acontecimentos que deram origem ao país moderno.",
    to: "/linha-do-tempo",
  },
  {
    etiqueta: "Cultura",
    titulo: "Um país formado por muitos povos",
    texto:
      "A riqueza cultural guineense nasce da convivência entre diferentes grupos étnicos. Cada povo possui formas próprias de falar, celebrar, educar, organizar a família, cultivar a terra, produzir arte e preservar a memória dos antepassados.",
    to: "/etnias",
  },
  {
    etiqueta: "Natureza",
    titulo: "Biodiversidade entre florestas, rios e arquipélagos",
    texto:
      "A Guiné-Bissau abriga ecossistemas variados que sustentam uma fauna muito diversa. Florestas, mangais, bolanhas, savanas, rios, ilhas e zonas costeiras criam habitats para inúmeras espécies de animais.",
    to: "/animais",
  },
];

const temas = [
  {
    titulo: "A luta de libertação e a independência",
    descricao:
      "Entenda os acontecimentos, personagens e movimentos que participaram da luta de libertação e da construção do Estado guineense.",
    to: "/linha-do-tempo",
    icone: BookOpen,
  },
  {
    titulo: "Tradições e vida comunitária",
    descricao:
      "Conheça costumes ligados à família, casamento, cerimónias, agricultura, religião tradicional, música e transmissão oral de conhecimentos.",
    to: "/etnias",
    icone: Users,
  },
  {
    titulo: "Regiões, paisagens e territórios",
    descricao:
      "Explore a relação entre as comunidades, o território continental, os rios, as ilhas e os diferentes ambientes naturais do país.",
    to: "/temas",
    icone: Map,
  },
  {
    titulo: "Património e memória coletiva",
    descricao:
      "Descubra lugares que guardam lembranças da história política, religiosa, social e cultural da Guiné-Bissau.",
    to: "/monumentos",
    icone: Landmark,
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <p className="eyebrow">Blog cultural e educativo da Guiné-Bissau</p>
              <h1 className="mt-3 max-w-4xl font-heading text-5xl font-semibold leading-[1.02] sm:text-7xl">
                Raízes da Guiné
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-foreground/70 sm:text-lg">
                Um espaço criado para reunir, organizar e valorizar a história, os povos,
                as culturas, a biodiversidade, os monumentos e a memória da Guiné-Bissau.
                Aqui, cada tema é apresentado de forma clara e aprofundada para estudantes,
                pesquisadores, guineenses da diáspora e qualquer pessoa que queira conhecer
                melhor o país.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/linha-do-tempo"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Começar pela história <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/etnias"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:border-primary/40"
                >
                  Conhecer os povos
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-muted/40 p-7">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="mt-5 font-heading text-2xl font-semibold">Conhecer para preservar</h2>
              <p className="mt-3 text-sm leading-7 text-foreground/65">
                O objetivo do Raízes da Guiné é transformar informação histórica e cultural
                em conhecimento acessível. Cada página do projeto procura explicar não apenas
                nomes e datas, mas também o significado, o contexto e a importância de cada
                povo, lugar, animal e acontecimento para a identidade guineense.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8">
          <p className="eyebrow">Explorar</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
            Descubra a Guiné-Bissau por grandes temas
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/65 sm:text-base">
            A navegação foi organizada para permitir que cada pessoa escolha por onde deseja
            começar. Você pode entrar pela história, pela cultura dos povos, pela fauna ou pelo
            património e seguir aprofundando cada assunto.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((categoria) => {
            const Icone = categoria.icone;
            return (
              <Link key={categoria.to} to={categoria.to} className="card-lift group p-6">
                <Icone className="h-6 w-6 text-primary" />
                <h3 className="mt-5 font-heading text-xl font-semibold">{categoria.titulo}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground/65">{categoria.descricao}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Abrir seção
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-muted/45">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Em destaque</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
              Leituras para entender o país por inteiro
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {destaques.map((item, index) => (
              <Link
                key={item.titulo}
                to={item.to}
                className="group rounded-2xl border border-border bg-background p-6 transition hover:border-primary/35 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[.22em] text-secondary">
                    {item.etiqueta}
                  </span>
                  <span className="font-heading text-3xl text-primary/25">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-heading text-2xl font-semibold leading-snug group-hover:text-primary">
                  {item.titulo}
                </h3>
                <p className="mt-4 text-sm leading-7 text-foreground/65">{item.texto}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Ler mais <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Uma visão mais ampla</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
              História, cultura e natureza estão ligadas
            </h2>
            <p className="mt-5 text-sm leading-7 text-foreground/70 sm:text-base">
              Compreender a Guiné-Bissau exige observar diferentes dimensões ao mesmo tempo.
              A história influencia os povos; os povos transformam os territórios; os territórios
              moldam as formas de viver; e a natureza participa diretamente da alimentação, da
              economia, das tradições e da identidade das comunidades.
            </p>
            <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
              Por isso, o Raízes da Guiné foi pensado como um projeto conectado: uma pessoa pode
              começar por um animal, chegar à região onde ele vive, conhecer os povos dessa região
              e depois descobrir os acontecimentos históricos relacionados ao mesmo território.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {temas.map((tema) => {
              const Icone = tema.icone;
              return (
                <Link
                  key={tema.titulo}
                  to={tema.to}
                  className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/35"
                >
                  <Icone className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 font-heading text-xl font-semibold">{tema.titulo}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/65">{tema.descricao}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.24em] text-primary-foreground/70">
                Continue explorando
              </p>
              <h2 className="mt-3 max-w-3xl font-heading text-3xl font-semibold sm:text-5xl">
                Cada página é uma porta de entrada para conhecer melhor a Guiné-Bissau.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-primary-foreground/75 sm:text-base">
                Explore a linha do tempo, conheça as etnias, descubra a fauna e visite os monumentos.
                O conteúdo será ampliado continuamente dentro do próprio projeto no GitHub.
              </p>
            </div>
            <Link
              to="/temas"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground"
            >
              Explorar temas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
