import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, sortBy, sortDir, status } = req.query;
  const response = await fetch(
    `http://localhost:3000/phrase/search?query=${query}&sortBy=${sortBy}&sortDir=${sortDir}&status=${status}`
  );
  const data = await response.json();
  res.status(200).json(data);
}
