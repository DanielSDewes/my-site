# Daniel Dewes — Portfolio

Portfolio premium Full Stack Developer com React + Vite + TailwindCSS + Framer Motion.

## 🚀 Setup

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## ✉️ EmailJS (formulário de contato)

Já configurado com suas credenciais em `src/config/emailjs.js`.

Certifique-se de que o **template** no painel do EmailJS usa estas variáveis:

| Variável        | O que é                  |
|-----------------|--------------------------|
| `{{from_name}}` | Nome do remetente        |
| `{{from_email}}`| Email do remetente       |
| `{{message}}`   | Corpo da mensagem        |

**Exemplo de template:**
```
Nova mensagem do portfólio!

Nome:     {{from_name}}
Email:    {{from_email}}

Mensagem:
{{message}}
```

## 🛠 Stack

- **React 18** + **Vite** — framework e build tool
- **TailwindCSS 3** — estilização utility-first
- **Framer Motion** — animações declarativas
- **Lenis** — smooth scrolling
- **Canvas API** — orb 3D interativo no Hero
- **EmailJS** — envio de emails sem backend
- **React Icons** — ícones

## 📁 Estrutura

```
src/
 ├─ components/
 │   ├─ Navbar/         # Navbar fixa com glassmorphism no scroll
 │   ├─ Hero/           # Seção hero com orb 3D em Canvas
 │   ├─ About/          # Sobre + stats animados
 │   ├─ Skills/         # Categorias com barras de progresso
 │   ├─ Experience/     # Timeline animada
 │   ├─ Projects/       # Cards com efeito 3D tilt
 │   ├─ GithubStats/    # Stats + barras de linguagens
 │   ├─ Contact/        # Formulário com EmailJS integrado
 │   ├─ Footer/         # Footer minimalista
 │   ├─ CustomCursor/   # Cursor personalizado com glow
 │   ├─ Divider/        # Divisor com gradiente
 │   └─ ScrollProgress/ # Barra de progresso no topo
 │
 ├─ config/
 │   └─ emailjs.js      # ← Credenciais do EmailJS
 │
 ├─ hooks/
 │   ├─ useSmoothScroll.js   # Lenis smooth scroll
 │   └─ useScrollReveal.js   # Intersection Observer helper
 │
 ├─ data/
 │   └─ portfolio.js    # ← EDITE AQUI: todo o conteúdo do portfólio
 │
 └─ App.jsx
```

## ✏️ Personalização

Todo o conteúdo fica em **`src/data/portfolio.js`**:

- `personalInfo` — nome, bio, links
- `skills` — categorias e níveis
- `experience` — histórico profissional
- `projects` — projetos com stack e links
- `githubStats` — números do GitHub
- `languages` — linguagens com porcentagem

## 🎨 Cores do tema

Editável em `tailwind.config.js` e `src/index.css`:

```css
--accent:  #00C2FF;   /* azul neon */
--accent2: #7C3AED;   /* roxo cyber */
--bg:      #050505;   /* preto profundo */
```

## 📦 Deploy (Vercel)

```bash
npm run build
# Arraste a pasta dist/ em vercel.com
# ou: npx vercel --prod
```
