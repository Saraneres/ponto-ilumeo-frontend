# 🌐 Frontend - Sistema de Controle de Ponto

Este é o frontend do sistema de ponto desenvolvido para o processo seletivo da Ilumeo. Interface moderna, responsiva e fiel ao protótipo no Figma.

## 🚀 Tecnologias e Ferramentas

- TypeScript
- Next.js 15 (App Router)
- Tailwind CSS
- ESLint + Prettier
- Vitest + React Testing Library

## 🎨 Layout

Layout inspirado e reproduzido com fidelidade ao protótipo Figma fornecido pela Ilumeo.

## 📁 Estrutura do Projeto

📦 ponto-frontend
├── src/
│ ├── app/
│ │ ├── dashboard/
│ │ └── page.tsx
│ ├── lib/
│ └── styles/
├── tests/
│ └── login.test.tsx
├── tailwind.config.js
├── postcss.config.js
└── vitest.config.ts

bash
Copiar
Editar

## 🔧 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/ponto-frontend.git

# Acesse a pasta
cd ponto-frontend

# Instale as dependências
npm install

# Inicie o servidor
npm run dev
🧪 Testes
bash
Copiar
Editar
# Executar testes
npm run test
🐳 Docker (opcional)
bash
Copiar
Editar
docker build -t ponto-frontend .
docker run -p 3000:3000 ponto-frontend
🔗 Deploy
Frontend hospedado no Vercel.
