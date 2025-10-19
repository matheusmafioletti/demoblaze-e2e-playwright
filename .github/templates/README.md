# GitHub Pages Templates

Este diretório contém templates HTML usados pelo workflow do GitHub Actions.

## reports-index.html

Template para a página principal do GitHub Pages que lista todos os relatórios de execução de testes.

### Placeholders:

- `<!-- Reports will be inserted here -->` - Lista de relatórios em HTML será inserida aqui
- `{{TOTAL_RUNS}}` - Número total de execuções
- `{{LATEST_RUN}}` - Identificador da última execução

### Como funciona:

1. O workflow copia este template
2. Gera a lista de relatórios dinamicamente
3. Substitui os placeholders pelos valores reais
4. Faz deploy para o GitHub Pages

### Customização:

Você pode editar este arquivo para personalizar:
- Cores e estilo (CSS)
- Layout e estrutura
- Textos e labels
- Adicionar mais informações

