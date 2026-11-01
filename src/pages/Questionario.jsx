import React from"react";
import{Link,useParams}from"react-router-dom";
import{ArrowLeft}from"lucide-react";
import QuizRunner from"@/components/quiz/QuizRunner";

const banco={
"História geral":[
 {pergunta:"Qual é a data da proclamação da independência da Guiné-Bissau?",opcoes:["24 de setembro de 1973","10 de setembro de 1974","25 de abril de 1974","20 de janeiro de 1973"],correta:0,explicacao:"A independência foi proclamada em 24 de setembro de 1973."},
 {pergunta:"Em que ano foi criado o PAIGC?",opcoes:["1945","1956","1963","1974"],correta:1,explicacao:"O PAIGC foi criado em 1956."},
 {pergunta:"Qual país reconheceu oficialmente a independência em 10 de setembro de 1974?",opcoes:["França","Portugal","Senegal","Brasil"],correta:1,explicacao:"Portugal reconheceu oficialmente a independência em 10 de setembro de 1974."},
 {pergunta:"Qual cidade é a capital da Guiné-Bissau?",opcoes:["Gabú","Bafatá","Bissau","Cacheu"],correta:2,explicacao:"Bissau é a capital do país."},
 {pergunta:"Qual destes temas pertence à história pré-colonial?",opcoes:["Sociedades e reinos locais","GitHub Pages","União Europeia","Internet móvel"],correta:0,explicacao:"Antes da colonização, diferentes sociedades e reinos organizavam a região."}
],
"Luta de libertação":[
 {pergunta:"Quem foi uma das principais figuras da luta de libertação?",opcoes:["Amílcar Cabral","Nelson Mandela","Kwame Nkrumah","Patrice Lumumba"],correta:0,explicacao:"Amílcar Cabral foi um dos principais dirigentes e pensadores da luta de libertação."},
 {pergunta:"A luta armada de libertação começou em qual década?",opcoes:["1920","1940","1960","1980"],correta:2,explicacao:"A luta armada desenvolveu-se a partir da década de 1960."},
 {pergunta:"A independência foi proclamada antes ou depois do reconhecimento português?",opcoes:["Antes","Depois","No mesmo dia","Nunca foi reconhecida"],correta:0,explicacao:"A proclamação ocorreu em 1973; Portugal reconheceu em 1974."},
 {pergunta:"Qual organização liderou a luta de libertação?",opcoes:["ONU","PAIGC","CEDEAO","OUA"],correta:1,explicacao:"O PAIGC liderou a luta de libertação da Guiné-Bissau."},
 {pergunta:"Madina do Boé está ligada a qual marco?",opcoes:["Primeiro aeroporto","Proclamação da independência","Fundação de Bissau","Criação do euro"],correta:1,explicacao:"Madina do Boé tem forte valor simbólico por sua ligação com a proclamação da independência."}
],
"Cultura e território":[
 {pergunta:"Qual língua é amplamente usada no quotidiano, além do português?",opcoes:["Crioulo guineense","Italiano","Alemão","Neerlandês"],correta:0,explicacao:"O crioulo guineense é amplamente usado na comunicação quotidiana."},
 {pergunta:"Qual arquipélago é uma das regiões mais conhecidas do país?",opcoes:["Açores","Canárias","Bijagós","Cabo Verde"],correta:2,explicacao:"O Arquipélago dos Bijagós pertence à Guiné-Bissau."},
 {pergunta:"Qual produto agrícola tem grande importância económica?",opcoes:["Caju","Trigo alpino","Café colombiano","Azeitona"],correta:0,explicacao:"O caju tem grande importância na economia do país."},
 {pergunta:"Qual destes grupos faz parte da diversidade cultural guineense?",opcoes:["Balanta","Sami","Maori","Inuit"],correta:0,explicacao:"Os balantas são um dos povos da Guiné-Bissau."},
 {pergunta:"Que ecossistema costeiro é muito importante para a biodiversidade?",opcoes:["Mangais","Tundra","Geleiras","Taiga"],correta:0,explicacao:"Os mangais têm grande importância ecológica e costeira."}
]
};
export default function Questionario(){const{categoria}=useParams();const nome=decodeURIComponent(categoria||"");const perguntas=banco[nome]||[];return <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20"><Link to="/questionarios" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-3.5 w-3.5"/>Todos os questionários</Link><p className="mt-8 text-[11px] font-medium uppercase tracking-[0.28em] text-primary">Questionário</p><h1 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">{nome}</h1><div className="mt-10">{perguntas.length?<QuizRunner perguntas={perguntas}/>:<p className="rounded-lg border border-border bg-card p-8">Este questionário ainda não foi criado.</p>}</div></div>}
