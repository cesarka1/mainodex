# 🔴 Mainôdex

Mainôdex é uma aplicação web desenvolvida em **Vue.js** que simula uma Pokédex, permitindo aos usuários explorar informações detalhadas sobre Pokémon, incluindo tipos, sprites, evoluções, movimentos e muito mais.

---

## 🚀 Funcionalidades

- 🎬 **Tela de Introdução**: Com animação e música de fundo.
- 📜 **Lista de Pokémon**: Listagem paginada com carregamento infinito.
- 🧪 **Filtros Avançados**: Filtro por nome, ID, espécie ou tipo.
- 📄 **Detalhes do Pokémon**:
  - Sprites
  - Evoluções
  - Movimentos
  - Altura, peso, experiência base e outros dados
- 🎵 **Música de Fundo**: Com botão para ativar/desativar.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Vue.js 3](https://vuejs.org/)
- **Ferramenta de build**: [Vite](https://vitejs.dev/)
- **Estilo**: CSS puro + [Bootstrap Icons](https://icons.getbootstrap.com/)
- **API pública**: [PokéAPI](https://pokeapi.co/)

---

## 📁 Estrutura do Projeto

```plaintext
mainodex/
├── .vscode/              # Configurações do VS Code
├── public/               # Arquivos públicos (ícones, imagens, etc.)
├── src/                  # Código-fonte
│   ├── assets/           # Áudios, imagens e outros recursos estáticos
│   ├── components/       # Componentes Vue reutilizáveis
│   │   ├── detail/       # Componentes específicos da tela de detalhes
│   ├── services/         # Serviços para comunicação com a PokéAPI
│   ├── utils/            # Funções utilitárias
│   ├── views/            # Páginas principais da aplicação
│   ├── App.vue           # Componente raiz
│   ├── main.js           # Arquivo de entrada
│   └── style.css         # Estilos globais
├── index.html            # HTML principal
├── package.json          # Dependências e scripts
└── vite.config.js        # Configuração do Vite
```

---

## 📦 Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/mainodex.git
   cd mainodex
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:5173
   ```

---

## 🧪 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção.
- `npm run preview`: Visualiza a build localmente.

---

## 🧩 Estrutura de Componentes

### 🔹 Componentes Principais
- `IntroScreen.vue`: Tela inicial com animação e botão de iniciar.
- `PokedexView.vue`: Página principal com lista e detalhes.
- `PokemonList.vue`: Lista com carregamento infinito.
- `PokemonDetail.vue`: Exibe informações detalhadas.

### 🔸 Componentes de Detalhe
- `PokemonTabs.vue`: Gerencia as abas de detalhes.
- `PokemonSprites.vue`: Exibe sprites.
- `PokemonEvolutions.vue`: Mostra evoluções.
- `PokemonMoves.vue`: Lista de movimentos.
- `PokemonAbout.vue`: Informações gerais.

### 🔧 Utilitários
- `pokemonUtils.js`: Funções auxiliares para formatar dados.

### 🔌 Serviços
- `PokemonService.js`: Responsável pelas requisições à PokéAPI.

---

## 🎨 Estilização

- Estilos globais definidos em `src/style.css`
- Estilos específicos com `scoped` nos componentes
- Ícones via Bootstrap Icons

---

## 🌐 API Utilizada

A aplicação utiliza a [PokéAPI](https://pokeapi.co/) para fornecer:

- Informações básicas (nome, tipos, sprites, ID, etc.)
- Cadeias de evolução
- Movimentos e métodos de aprendizado
- Games onde o Pokémon aparece

---

## 📸 Capturas de Tela

### Tela Inicial  
<img alt="Tela Inicial" src="https://via.placeholder.com/800x400?text=Tela+Inicial">

### Lista de Pokémon  
<img alt="Lista de Pokémon" src="https://via.placeholder.com/800x400?text=Lista+de+Pokémon">

### Detalhes do Pokémon  
<img alt="Detalhes do Pokémon" src="https://via.placeholder.com/800x400?text=Detalhes+do+Pokémon">

---

## 🤝 Contribuição

Contribuições são bem-vindas!  
Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.
