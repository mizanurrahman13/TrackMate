import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../../../src/app/Shared/Users';
import { match } from 'assert';

const SECRET = 'your_jwt_secret'; // Replace with env var in production

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    console.log("Request method:", req.method);
    
    console.log("Request body:", req.body);
    console.log("Available users:", users);

    console.log("User found:", user);
    if (user) {
      console.log("Stored password:", user.password);      
      const match = await bcrypt.compare(password, user.password);
      console.log("Password match:", match);
    }

    if (!user || !match) {
      console.log("Not OKay");
      return res.status(401).json({ message: 'Invalid credentials' });    
    }

    const token = jwt.sign({ email }, SECRET, { expiresIn: '30d' });

    console.log("OKay");
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }  
}

