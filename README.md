# Terê Verde Online

**Terê Verde Online** é um portal web dedicado à divulgação da biodiversidade, trilhas, parques, cachoeiras e eventos do município de Teresópolis-RJ. O projeto tem como objetivo promover o turismo sustentável, o conhecimento ambiental e facilitar o acesso a informações sobre as principais atrações naturais da região.

## Dados do integrante da equipe

Este projeto foi desenvolvido individualmente.

- **Nome:** Tamires Guedes Bernabe 
- **GitHub:** [https://github.com/t-guedes](https://github.com/t-guedes)  
- **E-mail:** tamiresguedesb@gmail.com

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Situação-Problema](#situação-problema)
- [Funcionalidades](#funcionalidades)
- [Requisitos do MVP](#requisitos-do-mvp)
  - [Requisitos Funcionais](#requisitos-funcionais)
  - [Requisitos Não-Funcionais](#requisitos-não-funcionais)
  - [Observações](#observações)
- [Escopo](#escopo)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Sobre o Projeto

O Terê Verde Online integra informações ambientais, dados de trilhas, parques, cachoeiras e eventos de Teresópolis em uma plataforma única, dinâmica e acessível, tanto para moradores quanto visitantes. O sistema inclui área administrativa para gerenciamento de conteúdos.

---

## Situação-Problema #1 Circuito Terê Verde

A geografia do município de Teresópolis é marcada por terrenos montanhosos entre vales, com a área urbana localizada em um planalto a 869 metros de altitude. O município é delimitado por três importantes unidades de conservação: o **Parque Nacional da Serra dos Órgãos**, o **Parque Estadual dos Três Picos** e o **Parque Natural Municipal Montanhas de Teresópolis**. Essas áreas protegidas impulsionam o turismo ecológico, especialmente o montanhismo, mas também limitam o crescimento urbano.

Apesar de ser um destino turístico conhecido pelas suas trilhas, cachoeiras e biodiversidade, ainda há dificuldades no acesso a informações atualizadas e organizadas sobre essas atrações.  

**O desafio** consiste em desenvolver uma **solução digital eficiente** que permita à população e aos turistas consultarem de forma prática as informações sobre trilhas, parques, eventos e biodiversidade dessas áreas.  

O projeto **Terê Verde Online** surge como resposta a essa necessidade, reunindo os dados em uma plataforma web responsiva, intuitiva e informativa, com recursos voltados tanto para o público geral quanto para administradores responsáveis pelo conteúdo.

---

## Funcionalidades

- **Visualização de Trilhas**: Lista e detalhes de trilhas, com filtros por parque e dificuldade.
- **Parques**: Informações detalhadas dos principais parques da região, incluindo biodiversidade.
- **Biodiversidade**: Espécies de fauna e flora, agrupadas por parque, com filtro dinâmico.
- **Cachoeiras**: Catálogo de cachoeiras com imagens, localização e características.
- **Eventos**: Agenda de eventos culturais, turísticos e ambientais em Teresópolis.
- **Área Administrativa**: Login de administradores, CRUD completo para todos os módulos.
- **Login seguro**: Sistema de autenticação JWT para admins.
- **Responsividade**: Layout adaptado para dispositivos móveis e desktop.

---

## Requisitos do MVP – Terê Verde Online

### Requisitos Funcionais

1. **Consulta Pública de Informações**
   - RF01: Permitir a consulta pública de trilhas, eventos, cachoeiras, parques e biodiversidade via endpoints GET.
   - RF02: Permitir filtros de busca por nome, espécie, data, etc. nos itens consultados.

2. **Gerenciamento Restrito por Administrador**
   - RF03: Permitir login de administrador via autenticação JWT.
   - RF04: Permitir CRUD de trilhas, parques, eventos, cachoeiras e biodiversidade apenas para administradores autenticados.
   - RF05: Permitir criação de novos administradores autenticados.
   - RF06: Permitir alteração de senha de administradores.
   - RF07: Impedir a exclusão do último administrador do sistema.

3. **Segurança**
   - RF08: Armazenar senhas de administradores de forma criptografada.
   - RF09: Usar tokens JWT para proteger rotas administrativas.
   - RF10: Garantir que administradores só possam acessar áreas restritas mediante token válido.

4. **Gestão de Disponibilidade e Novidades**
   - RF11: Administrador pode alterar disponibilidade de eventos e atualizar informações.

### Requisitos Não-Funcionais

- RNF01: O sistema deve ser responsivo e responder rapidamente a múltiplos acessos simultâneos.
- RNF02: O banco de dados deve ser persistente e armazenar dados de forma íntegra.
- RNF03: O backend deve ser implementado em Python com FastAPI.
- RNF04: O código deve ser versionado em repositório GitHub, com organização clara de diretórios.
- RNF05: O sistema deve garantir a privacidade e segurança dos dados dos administradores.
- RNF06: A API deve permitir integração fácil com front-end web.
- RNF07: O sistema deve ser facilmente instalável e executável localmente.

### Observações

- Todo acesso de escrita exige autenticação.
- Visitantes comuns apenas consultam informações, sem autenticação.

---

## Escopo

### O que está incluído (O que o MVP faz)

- Portal público com:
  - Biodiversidade (fauna e flora) por parque.
  - Lista de trilhas, parques, cachoeiras e eventos.
  - Filtros dinâmicos integrados.
  - Detalhes, mapas (Google Maps/embed), imagens e dicas.
- Área administrativa:
  - Cadastro, edição e exclusão de todas as entidades.
  - Gerenciamento de usuários admins (criação, exclusão, troca de senha).
- Autenticação JWT para admins.
- Layout responsivo e acessível.
- Imagens, descrições e links oficiais das atrações.
- Scripts para inicialização local (dev).

### O que está fora do escopo (O que o MVP **não** faz)

- Integração com sistemas de pagamento ou reservas.
- Upload de arquivos/imagens (URLs apenas).
- Cadastro de visitantes finais ou interações avançadas (comentários, avaliações).
- Integração direta com bancos de dados externos ou APIs de terceiros (exceto mapas).
- Tradução multilíngue automática.
- Não permite cadastro, login ou controle de acesso para visitantes comuns (visitante não faz login).
- Não realiza reservas ou inscrições em eventos/trilhas, apenas consulta.
- Não gerencia avaliações ou comentários de visitantes.

---

## Como Rodar o Projeto

### Backend

1. Acesse a pasta do backend:
   ```bash
   cd tere-verde-online/backend
   ```

2. (Opcional) Crie e ative um ambiente virtual:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   pip install fastapi uvicorn
   ```

4. Execute o servidor FastAPI:
   ```bash
   uvicorn main:app --reload
   ```

- O backend estará disponível em `http://localhost:8000`.

### Frontend

1. Acesse a pasta do frontend:
   ```bash
   cd tere-verde-online/frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

- O frontend estará disponível em `http://localhost:5173` (ou porta exibida no terminal).

---

## Estrutura do Projeto

```plaintext
tere-verde-online/
├── backend/
└── __pycache__/
│   │       ├── auth.cpython-312.pyc
│   │       ├── database.cpython-312.pyc
│   │       ├── main.cpython-312.pyc
│   │       └── schemas.cpython-312.pyc
│   ├── Routes/
│   │   ├── __init__.py
│   │   ├── admins.py
│   │   ├── auth.py
│   │   ├── biodiversity.py
│   │   ├── events.py
│   │   ├── parks.py
│   │   ├── trails.py
│   │   ├── waterfalls.py
│   │   └── __pycache__/
│   │       ├── admins.cpython-312.pyc
│   │       ├── auth.cpython-312.pyc
│   │       ├── biodiversity.cpython-312.pyc
│   │       ├── events.cpython-312.pyc
│   │       ├── parks.cpython-312.pyc
│   │       ├── trails.cpython-312.pyc
│   │       └── waterfalls.cpython-312.pyc
│   ├── auth_utils.py
│   ├── database.py
│   ├── main.py
│   ├── schemas.py
│   ├── teredeverde.db
│   ├── requirements.txt
│   └── venv/                  
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   ├── cabeca-de-dragao.jpg
│   │   │   ├── cartao-postal.jpeg
│   │   │   ├── pedra-da-tartaruga.jpg
│   │   │   ├── Pedra-do-Camelo.jpeg
│   │   │   ├── pedra-do-sino.jpg
│   │   │   ├── Travessia Vale dos Deuses x Vale dos Frades com indicação de picos.jpg
│   │   │   ├── trilha-do-jequitiba.jpg
│   │   │   └── trilha-suspensa.jpg
│   │   ├── components/
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── Biodiversity.jsx
│   │   │   ├── BiodiversityForm.jsx
│   │   │   ├── EventForm.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── MapLink.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ParkForm.jsx
│   │   │   ├── Parks.jsx
│   │   │   ├── TrailForm.jsx
│   │   │   ├── Trails.jsx
│   │   │   ├── WaterfallForm.jsx
│   │   │   └── Waterfalls.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
└──  README.md

```

---

## Tecnologias Utilizadas

- **Frontend:** React, Vite, CSS3, Context API
- **Backend:** FastAPI, Python 3.12+, SQLite
- **Outros:** JWT para autenticação, Google Maps (embed), React Router

---

## Prototipação
O protótipo foi desenvolvido através do Canvas.

As duas primeiras telas escolhidas para prototipação foram: 
- Página de Login do administrador (AdminLogin.jsx)
-  ![LoginAdministrador](https://github.com/user-attachments/assets/35732935-39b5-4066-9117-5de3669014a2)

- Página de Cadastrar novo evento (EventForm.jsx)
![CadastrarNovoEvento](https://github.com/user-attachments/assets/77b84553-2e49-47d9-9b2f-89b3c358d803)

---

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature/correção (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -m 'Minha contribuição'`)
4. Push para o branch (`git push origin minha-feature`)
5. Abra um Pull Request

---

## Licença

MIT © 2025 — Terê Verde Online / Unifeso
