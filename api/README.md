# Quiz API

V1 da API do projeto [Quiz](../README.md), feita com Node.js, TypeScript, Fastify e Zod. Usa repositories em memória; os dados são perdidos ao reiniciar o servidor.

## Rodando localmente

Na pasta `api/`, com Node.js e Yarn instalados:

```bash
cp .env.example .env
yarn install
yarn dev
```

A API inicia em `http://localhost:8080` por padrão. `PORT` e `HOST` podem ser ajustados no `.env`. Para verificar os tipos, execute `yarn typecheck`.

## Rotas

| Método | Rota | Body JSON |
| --- | --- | --- |
| POST | `/topics/create-topic` | `{"name":"AWS Cloud Practitioner"}` |
| GET | `/topics/list-topics` | — |
| POST | `/quizzes/create-quiz` | `{"topicId":"<uuid>","title":"AWS Fundamentals"}` |
| POST | `/quizzes/questions/add-question` | `{"quizId":"<uuid>","statement":"Storage?","alternatives":[{"text":"EC2","isCorrect":false},{"text":"S3","isCorrect":true}]}` |
| QUERY | `/quizzes/get-quiz` | `{"quizId":"<uuid>"}` |

Envie `Content-Type: application/json` nas requisições com body, inclusive no método HTTP `QUERY`. Use os IDs retornados pelas rotas de criação. Cada questão precisa de pelo menos duas alternativas e exatamente uma correta.
