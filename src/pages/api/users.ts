import { NextApiRequest, NextApiResponse } from "next"

// estratégia de autenticação
// 1)Token JWT salvo no Storage do navegador com uma data de expiração
// 2) Next Auth 
    // (simples, login social, github, google, facebook, twitter) 
    // não quer se preocupar armazenar credenciais de acesso do usuario no backend 
// 3) provider de autenticação externo COGNITO, AUTH0


export default (request:NextApiRequest, response:NextApiResponse) => {
  const users = [
    { id: "1", name: "Gaia" },
    { id: "2", name: "Jose" },
    { id: "3", name: "Sophia" },
  ];
  return response.json(users);
}
//API ROUTES
// serverless
// sobe um ambiente isolado, executar a funcao, retornar a resposta e o ambiente morre
// não precisa do servidor 24h rodando pra aguardar as requisições
// sobe e desce conforme a necessidade das chamadas