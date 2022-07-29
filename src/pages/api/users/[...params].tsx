import { NextApiRequest, NextApiResponse } from "next"

export default (request:NextApiRequest, response:NextApiResponse) => {
  
  console.log(request.query)
  
  const users = [
    { id: "1", name: "Gaia" },
    { id: "2", name: "Jose" },
    { id: "3", name: "Sophia" },
  ];
  return response.json(users);
}