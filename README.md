# Viraliza AI Studio

Web app em desenvolvimento para criação e continuação de vídeos com IA.

## Estado atual

- Interface principal de geração de vídeo.
- Upload e preview de vídeo/imagem de referência.
- Prompt de criação e opções de modo, duração, formato e qualidade.
- Salvamento das configurações no navegador.
- Conexão preparada para um motor local em `http://127.0.0.1:8787`.
- Backend local inicial em `local-engine/` com endpoints `/health`, `/generate` e `/jobs/{id}`.

## Próxima etapa

Instalar e integrar um modelo open source de geração de vídeo compatível com a GPU do computador. O backend atual recebe corretamente os pedidos, mas ainda não executa geração de IA.

## Segurança da versão anterior

A antiga simulação da Clínica Sorriso foi preservada na branch:

`backup-clinica-original-2026-10-21`
