# Configuração do Banco de Dados YleSpace Ceremony

Este documento contém instruções para configurar o banco de dados MySQL para o projeto YleSpace Ceremony.

## Pré-requisitos

- MySQL Server instalado
- MySQL Workbench instalado

## Passos para Configuração

1. Abra o MySQL Workbench
2. Conecte-se ao seu servidor MySQL local
3. Abra o arquivo `setup_database_complete.sql` que está na raiz do projeto
4. Execute o script completo

O script irá:
- Criar o banco de dados `ylespace_ceremony`
- Criar um usuário `ylespace_user` com senha `ylespace123`
- Conceder todos os privilégios necessários ao usuário
- Criar todas as tabelas necessárias para o funcionamento do site
- Inserir dados iniciais para o usuário administrador e a página sobre

## Verificação

Após executar o script, você pode verificar se tudo foi configurado corretamente:

1. No MySQL Workbench, expanda a lista de bancos de dados e verifique se `ylespace_ceremony` foi criado
2. Expanda o banco de dados e verifique se todas as tabelas foram criadas:
   - perfis
   - frentes
   - categorias_ervas
   - ervas
   - banhos
   - banhos_ervas
   - sobre
   - usuarios

## Conexão com a Aplicação

A aplicação já está configurada para se conectar ao banco de dados através das variáveis de ambiente no arquivo `.env`:

```
DB_HOST=localhost
DB_USER=ylespace_user
DB_PASSWORD=ylespace123
DB_NAME=ylespace_ceremony
```

Se você precisar alterar alguma dessas configurações, atualize o arquivo `.env` e reinicie a aplicação.

## Solução de Problemas

Se encontrar algum erro durante a execução do script:

1. Verifique se o MySQL Server está em execução
2. Verifique se você tem permissões de administrador no MySQL
3. Se alguma tabela já existir, o script não irá sobrescrevê-la devido ao uso de `IF NOT EXISTS`

## Dados de Acesso ao Sistema

Após a configuração, você pode acessar o sistema com as seguintes credenciais:

- Email: admin@ylespace.com
- Senha: admin123