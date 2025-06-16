# crm-fastify-prisma-sqlite

### 1. Faça um clone do projeto 

### 2. Instale as dependências 
`npm install` 

> Certifique-se de estar usando Node.js v20 ou superior

### 3. Gere o banco de dados 

`npx prisma migrate dev --name init` 

> Isso criará um banco SQLite em `prisma/dev.db`

----------

## ▶️ Rodando o servidor



`npm run dev` 

O servidor iniciará em `http://localhost:3000`.

----------

## 🌐 Usando o Frontend

1.  Abra o arquivo `public/index.html` no navegador.
    
2.  Cadastre uma nova conta.
    
3.  Faça login e comece a cadastrar leads.
    
4.  Os leads cadastrados serão listados automaticamente.


### CURLS DE TESTE
```bash

~ …
➜ curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "name": "João",
    "password": "123456",
    "orgName": "Empresa X"
  }'

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm9yZ0lkIjoxLCJpYXQiOjE3NTAwNDM1ODN9.9zXuoSi_NuiUN0vOxg5DqlBg03CKT4lUsEGa1x2gYXU"}%            
~ …
➜ curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "123456"
  }'

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm9yZ0lkIjoxLCJpYXQiOjE3NTAwNDM1OTJ9.WKtoOvLg_aKN3nx1nJdarmXarUBRqlRUExTSSQIzODo"}%            
~ …
➜ curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "name": "Carlos Silva",
    "company": "ACME Corp",
    "title": "CTO",
    "email": "carlos@acme.com",
    "phone": "11999990000",
    "source": "LinkedIn",
    "stage": "Novo"
  }'

{"statusCode":401,"code":"FST_JWT_AUTHORIZATION_TOKEN_INVALID","error":"Unauthorized","message":"Authorization token is invalid: The token is malformed."}%   
~ …
➜ curl -X GET http://localhost:3000/leads \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

{"statusCode":401,"code":"FST_JWT_AUTHORIZATION_TOKEN_INVALID","error":"Unauthorized","message":"Authorization token is invalid: The token is malformed."}%   
~ …
➜ curl -X GET http://localhost:3000/leads \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm9yZ0lkIjoxLCJpYXQiOjE3NTAwNDM1ODN9.9zXuoSi_NuiUN0vOxg5DqlBg03CKT4lUsEGa1x2gYXU"

[]%                                                                            
~ …
➜ curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm9yZ0lkIjoxLCJpYXQiOjE3NTAwNDM1ODN9.9zXuoSi_NuiUN0vOxg5DqlBg03CKT4lUsEGa1x2gYXU" \
  -d '{
    "name": "Carlos Silva",
    "company": "ACME Corp",
    "title": "CTO",
    "email": "carlos@acme.com",
    "phone": "11999990000",
    "source": "LinkedIn",
    "stage": "Novo"
  }'

{"id":1,"name":"Carlos Silva","company":"ACME Corp","title":"CTO","email":"carlos@acme.com","phone":"11999990000","source":"LinkedIn","stage":"Novo","lastContactedAt":null,"orgId":1}%                                                      
~ …
➜ curl -X GET http://localhost:3000/leads \ 
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm9yZ0lkIjoxLCJpYXQiOjE3NTAwNDM1ODN9.9zXuoSi_NuiUN0vOxg5DqlBg03CKT4lUsEGa1x2gYXU"

[{"id":1,"name":"Carlos Silva","company":"ACME Corp","title":"CTO","email":"carlos@acme.com","phone":"11999990000","source":"LinkedIn","stage":"Novo","lastContactedAt":null,"orgId":1}]%                                                    

```  
