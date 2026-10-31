# iLab

Protótipo do redesenho do iLab 3.0 (módulo Minhas Consultas), com Guia de status e uma Bancada 3D interativa em three.js.

- `bancada.html`: tela inicial. Bancada de laboratório 3D com amostras, ensaios e equipamentos. Na primeira visita da sessão abre com uma introdução de até 5 s (`?intro=1` força, `?intro=0` pula).
- `index.html`: protótipo navegável (consultas, resultados, ajustes, guia de status). Sem rota (`#/...`), redireciona para a bancada.
- `erlenmeyer.html`: Laboratório livre, área de testes com o Erlenmeyer 3D (volume, líquido, bastão e agitação).
- `case/`: case de portfólio em inglês (landing page com narrativa por scroll, GSAP). As imagens em `case/shots/` são capturas reais deste protótipo.
- `logo.js`: logo iLAB (`<ilab-logo>`), com o "A" em forma de Erlenmeyer.

Todos os dados, amostras e e-mails são fictícios.
