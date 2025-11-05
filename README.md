# Filosofia em Perspectiva

**Filosofia em Perspectiva** é um website que transforma reflexões filosóficas em experiências reais e práticas.

Ele propõe um espaço digital de acolhimento, propósito e autoconhecimento, conectando sabedoria filosófica com os desafios do cotidiano moderno.

## Como rodar o projeto

Abra o terminal e faça o passo a passo abaixo.

### 1. Clone o repositório

```bash
git clone https://github.com/beatrizzcoan/filosofiaemperspectiva.git
```

### 2. Entre no diretório do projeto

```bash
cd filosofiaemperspectiva/
```

### 3. Instale dependências

Instale o React Router DOM (responsável pela navegação entre páginas):

```bash
npm install react-router-dom
```

Caso ainda não tenha instalado as dependências básicas do projeto, execute também:

```bash
npm install
```

### 4. Rode o servidor de desenvolvimento

```bash
npm run dev
```

### 5. Acesse no navegador

Abra o navegador e acesse:

```arduino
http://localhost:3000
```

## Tecnologias utilizadas

- **[Vite](https://vitejs.dev/)**  
  → Ferramenta de build rápida e moderna usada para criar o ambiente React.

- **[React](https://react.dev/)**  
  → Biblioteca JavaScript para construção de interfaces dinâmicas e componentes reutilizáveis.

- **[TypeScript](https://www.typescriptlang.org/)**  
  → Superset do JavaScript que adiciona tipagem estática ao código (arquivos `.tsx`).

- **[Tailwind CSS](https://tailwindcss.com/)**  
  → Framework de estilos utilitários usado para criar o design e layout da interface.

- **[PostCSS](https://postcss.org/)**  
  → Processador de CSS usado junto ao Tailwind para transformar estilos durante o build.

- **[React Router DOM](https://reactrouter.com/)**  
  → Biblioteca responsável pela navegação entre as páginas do site.

- **[Node.js + npm](https://nodejs.org/)**  
  → Plataforma e gerenciador de pacotes usados para instalar dependências e rodar o projeto localmente.


## Estrutura do projeto
```bash
filosofiaemperspectiva/
├──vite-project/
│   ├── public/ # imagens do projeto
│   ├── src/
│   │   ├── components/ # componentes reutilizáveis da interface
│   │   ├── pages/ # páginas principais do site
│   │   ├── App.tsx # arquivo principal do app
│   │   ├── index.css # estilo do site
│   │   └── main.tsx # ponto de entrada da aplicação
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.js
└── README.md
```