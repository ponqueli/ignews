import { NextApiRequest, NextApiResponse } from "next"
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