
# SimplyInvite - Plataforma de Conexão entre Talentos e Empresas

## Informações do Projeto

## Como usar este projeto

### Usar sua IDE preferida

Se preferir trabalhar localmente usando sua própria IDE, você pode clonar este repositório e enviar alterações. As modificações enviadas também serão refletidas no Lovable.

O único requisito é ter Node.js e npm instalados - [instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Passo 1: Clone o repositório usando a URL Git do projeto.
git clone <URL_DO_SEU_GIT>

# Passo 2: Navegue até o diretório do projeto.
cd <NOME_DO_SEU_PROJETO>

# Passo 3: Instale as dependências necessárias.
npm i

# Passo 4: Inicie o servidor de desenvolvimento com recarga automática e pré-visualização instantânea.
npm run dev
```

### Editar um arquivo diretamente no GitHub

- Navegue até o(s) arquivo(s) desejado(s).
- Clique no botão "Edit" (ícone de lápis) no canto superior direito da visualização do arquivo.
- Faça suas alterações e confirme-as.

### Usar o GitHub Codespaces

- Navegue até a página principal do seu repositório.
- Clique no botão "Code" (botão verde) próximo ao canto superior direito.
- Selecione a aba "Codespaces".
- Clique em "New codespace" para iniciar um novo ambiente Codespace.
- Edite os arquivos diretamente no Codespace e confirme e envie suas alterações quando terminar.

## Como fazer login no modo de desenvolvimento

Este sistema possui três tipos de perfis: Jovem Talento, Profissional RH e Gestor. No modo de desenvolvimento (quando o Supabase não está configurado), você pode usar os seguintes métodos para fazer login:

### Opção 1: Usar os botões de login rápido
Na página de login (Jovem, RH ou Gestor), você verá uma caixa laranja com botões para login rápido.

### Opção 2: Utilizar credenciais de teste
- **Perfil Jovem Talento**:
  - Email: jovem@example.com
  - Senha: senha123
- **Perfil RH**:
  - Email: rh@example.com
  - Senha: senha123
- **Perfil Gestor**:
  - Email: gestor@example.com
  - Senha: senha123

## Tecnologias utilizadas neste projeto

Este projeto é construído com:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (para autenticação e banco de dados)

## Estrutura do Projeto

- `src/`: Código fonte principal
  - `components/`: Componentes React reutilizáveis
  - `pages/`: Páginas da aplicação
  - `backend/`: Lógica do backend
    - `auth/`: Serviços de autenticação
    - `database/`: Configuração do banco de dados
    - `services/`: Serviços específicos por perfil
    - `types/`: Tipos e interfaces
    - `utils/`: Funções utilitárias
  - `contexts/`: Contextos React (AuthContext, etc.)
  - `hooks/`: Hooks personalizados

## Configuração para Produção

Para usar em ambiente de produção, você precisa:

1. Criar um projeto no Supabase (https://supabase.com)
2. Obter as credenciais do projeto (URL e chave anônima)
3. Configurar as variáveis de ambiente:
   - `VITE_SUPABASE_URL`: URL do seu projeto Supabase
   - `VITE_SUPABASE_ANON_KEY`: Chave anônima do seu projeto Supabase

## Como implantar este projeto

Abra [Lovable](https://lovable.dev/projects/0f2240e2-a93e-4140-98b9-b1de4eca2e73) e clique em Share -> Publish.

## Posso conectar um domínio personalizado ao meu projeto Lovable?

Sim, você pode!

Para conectar um domínio, navegue até Project > Settings > Domains e clique em Connect Domain.

Leia mais aqui: [Configurando um domínio personalizado](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
