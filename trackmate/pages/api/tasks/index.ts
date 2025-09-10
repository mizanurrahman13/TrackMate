import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/app/Shared/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("taskdb"); // ✅ must match your MongoDB database name
    const tasks = await db.collection("tasks").find({}).toArray();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("MongoDB fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
