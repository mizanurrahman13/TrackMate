import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { users } from '../../../src/app/Shared/Users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  res.status(200).json({ message: 'User registered successfully' });

  async function generateHash() {
      const plainPassword = "lamia";
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      console.log("Hashed password:", hashedPassword);
  } 
}
