# Raízes da Guiné

Ambiente de desenvolvimento e teste do projeto **Raízes da Guiné**, uma plataforma cultural e educativa sobre a história, os povos, a biodiversidade, a gastronomia, o património e a vida contemporânea da Guiné-Bissau.

Este repositório substitui o antigo projeto de demonstração da clínica e passa a ser usado como laboratório do aplicativo antes das atualizações finais na Base44.

## Como o projeto está organizado

- **GitHub:** código, páginas, componentes, estilos, navegação e modelos das entidades.
- **Base44:** banco de dados vivo com os artigos, animais, etnias, eventos, monumentos, perguntas e demais registros do aplicativo.
- Ao executar o projeto conectado ao app Base44, a interface consulta esses registros e mostra o conteúdo atual.

Essa separação evita manter duas cópias diferentes do banco de dados e permite desenvolver e testar a interface no GitHub sem gastar créditos do Builder a cada alteração.

## Desenvolvimento local

```bash
npm install
base44 login
base44 link
base44 dev
```

O app Base44 correspondente é **Raízes da Guiné** (`6ad9875bde181c92fc16e902`).

## Objetivo do repositório

Fazer aqui as melhorias de estrutura, menus, páginas, experiência visual e organização do conteúdo. Quando a versão estiver aprovada, as mudanças serão levadas para a versão final na Base44.
