# Quiz

Uma Quiz API feita em lives no TikTok. A ideia é construir o projeto aos poucos, compartilhando o processo e aprendendo em público.

## Hoje

A V1 usa Node.js, TypeScript, Fastify e Zod. É possível criar e listar tópicos, criar quizzes, adicionar questões e consultar um quiz. Os dados ficam em memória e são perdidos ao reiniciar a API.

## Rodando localmente

Com Node.js e Yarn instalados:

```bash
cp .env.example .env
yarn install
yarn dev
```

A API inicia em `http://localhost:8080` por padrão. Ajuste `PORT` e `HOST` no `.env` se precisar.

## Rotas

| Método | Rota | Body JSON |
| --- | --- | --- |
| POST | `/topics/create-topic` | `{"name":"AWS Cloud Practitioner"}` |
| GET | `/topics/list-topics` | — |
| POST | `/quizzes/create-quiz` | `{"topicId":"<uuid>","title":"AWS Fundamentals"}` |
| POST | `/quizzes/questions/add-question` | `{"quizId":"<uuid>","statement":"Storage?","alternatives":[{"text":"EC2","isCorrect":false},{"text":"S3","isCorrect":true}]}` |
| QUERY | `/quizzes/get-quiz` | `{"quizId":"<uuid>"}` |

Envie `Content-Type: application/json` nas requisições com body, inclusive no método `QUERY`. Use os IDs retornados pelas rotas de criação. Uma questão precisa ter pelo menos duas alternativas e exatamente uma correta.

## Próximos passos

Quero reimplementar a API em Go como exercício de aprendizado. Mais adiante, talvez o projeto ganhe telas e uma experiência mobile, explorando React Native ou Flutter. A organização em monorepo, com a API em `api/`, será feita em uma etapa futura.
